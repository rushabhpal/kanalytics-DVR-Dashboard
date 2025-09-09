const { scanAndSaveSlots } = require('./scanner');

let isScanning = false;

async function autoScan() {
  if (isScanning) {
    console.log('Previous scan still running. Skipping this interval.');
    return;
  }

  isScanning = true;
  console.log('\n[AutoScan] Starting scan at', new Date().toLocaleString());

  try {
    const summary = await scanAndSaveSlots();
    console.log('[AutoScan] Scan completed:', summary);
  } catch (err) {
    console.error('[AutoScan] Error during scan:', err);
  } finally {
    isScanning = false;
  }
}

function startAutoScan(intervalMinutes = 5) {
  // Run immediately
  autoScan();

  // Schedule every X minutes
  setInterval(autoScan, intervalMinutes * 60 * 1000);
}

module.exports = { startAutoScan };
