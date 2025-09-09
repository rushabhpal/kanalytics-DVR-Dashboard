const express = require('express');
const router = express.Router();
const { getTodaySlots, manualScan } = require('../controllers/slotController');

// GET /api/slots/today → all today’s slots
router.get('/today', getTodaySlots);

// POST /api/slots/scan → manually trigger SMB scan
router.post('/scan', manualScan);

module.exports = router;
