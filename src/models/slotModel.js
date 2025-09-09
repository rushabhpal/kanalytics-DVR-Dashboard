const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  kdvr: String,
  file: String,
  channel: String,
  folderDate: String,
  sizeMB: Number,
  created: Date,
  createdDate: String,
  createdTime: String,
  slot: String,
  downloaded: Boolean,
  slotId: String // keep it, but not unique anymore
}, {
  timestamps: true
});


slotSchema.index({ slotId: 1 }); // no unique:true


const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
