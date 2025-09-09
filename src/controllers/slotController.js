const Slot = require('../models/slotModel');
const { scanAndSaveSlots } = require('../tasks/scanner');

// Helper: today in IST
function todayIST() {
  const now = new Date();
  const IST_OFFSET_MIN = 330;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + IST_OFFSET_MIN * 60000);

  const yyyy = ist.getFullYear();
  const mm = String(ist.getMonth() + 1).padStart(2, '0');
  const dd = String(ist.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// GET today’s slots
async function getTodaySlots(req, res) {
  try {
    const day = todayIST();
    const slots = await Slot.find({ folderDate: day }).lean().exec();
    res.json(slots);
  } catch (err) {
    console.error('Error fetching today slots:', err);
    res.status(500).send('Server error');
  }
}

// POST manual scan
async function manualScan(req, res) {
  try {
    const result = await scanAndSaveSlots();
    res.json(result);
  } catch (err) {
    console.error('Error scanning slots:', err);
    res.status(500).send('Scan failed');
  }
}

module.exports = { getTodaySlots, manualScan };
