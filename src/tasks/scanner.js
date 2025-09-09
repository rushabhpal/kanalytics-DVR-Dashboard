const { kdvrConfigs } = require('../config');
const { fetchSlots } = require('../services/smbService');
const Slot = require('../models/slotModel');

async function scanAndSaveSlots() {
  let summary = [];

  for (const config of kdvrConfigs) {
    console.log(`\n=============== SCANNING ${config.kdvr} ===============`);

    const slots = await fetchSlots(config);
    if (slots.length === 0) {
      console.log(`No slots found for ${config.kdvr}`);
      summary.push({ kdvr: config.kdvr, found: 0, new: 0 });
      continue;
    }

    // console.log(slots); // log all slots for debugging

    const bulkOps = slots.map(s => {
      // new slotId combining kdvr + channel + slot + folderDate
      const slotId = `${s.kdvr}-${s.channel}-${s.folderDate}-${s.slot}`;

      return {
        updateOne: {
          filter: { slotId }, // ✅ use slotId only
          update: { $set: { ...s, slotId } },
          upsert: true
        }
      };
    });

    try {
      const bulkResult = await Slot.bulkWrite(bulkOps);
      console.log(`${config.kdvr} — Found: ${slots.length}, New: ${bulkResult.upsertedCount}`);
      summary.push({ kdvr: config.kdvr, found: slots.length, new: bulkResult.upsertedCount });
    } catch (err) {
      console.error(`Error inserting slots for ${config.kdvr}:`, err.message);
    }
  }

  return summary;
}

module.exports = { scanAndSaveSlots };
