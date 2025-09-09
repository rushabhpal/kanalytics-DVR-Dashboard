const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./services/db');
const slotRoutes = require('./routes/slotRoutes');
const { startAutoScan } = require('./tasks/autoScan'); // <--- import

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/slots', slotRoutes);

// Start server
(async () => {
  try {
    await connectToDatabase(process.env.MONGO_URI);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);

      // Start the 5-min auto scan
      startAutoScan(5); // runs every 5 minutes
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();
