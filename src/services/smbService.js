// smbService.js
const SMB2 = require('@marsaud/smb2');
const path = require('path');
const { runWithLimit } = require('../utils/concurrency');

function smbReaddir(client, folderPath) {
  return new Promise((resolve, reject) => {
    client.readdir(folderPath, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

function smbStat(client, filePath) {
  return new Promise((resolve, reject) => {
    client.stat(filePath, (err, st) => {
      if (err) reject(err);
      else resolve(st);
    });
  });
}

function getSlotFromFilename(filename) {
  const match = filename.match(/-(\d{6}-\d{6})\./);
  return match ? match[1] : null;
}

async function fetchSlots(config) {
  const smb2Client = new SMB2({
    share: config.share,
    domain: 'WORKGROUP',
    username: config.username,
    password: config.password
  });
  const allSlots = [];

  try {
    const months = await smbReaddir(smb2Client, config.basePath);

    for (const month of months) {
      const monthPath = path.join(config.basePath, month);
      const days = await smbReaddir(smb2Client, monthPath);

      for (const day of days) {
        const dayPath = path.join(monthPath, day);
        const channels = await smbReaddir(smb2Client, dayPath);

        for (const channel of channels) {
          const channelPath = path.join(dayPath, channel);

          let files = await smbReaddir(smb2Client, channelPath);
          files = files.filter(f => f.match(/\.(mp4|ts|mkv|avi)$/i));

          // Fetch stats in parallel, limited concurrency
          const slotInfos = await runWithLimit(8, files, async (file) => {
            const filePath = path.join(channelPath, file);

            try {
              const stats = await smbStat(smb2Client, filePath);
              const sizeMB = parseFloat((stats.size / (1024 * 1024)).toFixed(2));

              const createdDate = stats.ctime.toISOString().slice(0, 10);
              const createdTime = stats.ctime.toISOString().slice(11, 19); // HH:mm:ss

              return {
                slotId: `${config.kdvr}-${day}-${getSlotFromFilename(file)}`,
                kdvr: config.kdvr,
                file,
                channel,
                folderDate: day,
                sizeMB,
                created: stats.ctime,
                createdDate,
                createdTime,
                slot: getSlotFromFilename(file),
                downloaded: stats.size > 0 
              };
            } catch (err) {
              // File stat failed (maybe missing / permission issue)
              return {
                kdvr: config.kdvr,
                file,
                channel,
                folderDate: day,
                sizeMB: 0,
                created: null,
                createdDate: null,
                createdTime: null,
                slot: getSlotFromFilename(file),
                downloaded: false 
              };
            }
          });

          allSlots.push(...slotInfos);
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning ${config.kdvr}:`, err.message);
  }

  return allSlots;
}

module.exports = { fetchSlots };
