const mongoose = require('mongoose');

const ExpenseBillRowSchema = new mongoose.Schema({
  srNo: { type: Number, required: true },
  date: { type: String, default: '' },
  vendorName: { type: String, default: '', trim: true },
  billNo: { type: String, default: '', trim: true },
  amount: { type: Number, default: null },
  particulars: { type: String, default: '', trim: true },
  originalBillReceived: { type: String, enum: ['', 'Yes', 'No'], default: '' },
  remarks: { type: String, default: '', trim: true }
}, { _id: false });

const ExpenseBillSchema = new mongoose.Schema({
  sheetDate: { type: String, default: '' },
  rows: { type: [ExpenseBillRowSchema], default: [] },
  preparedBy: { type: String, default: 'Varsha Jyotishi', trim: true },
  checkedBy: { type: String, default: 'Urna Banerji', trim: true },
  approvedBy: { type: String, default: 'Aashit shah', trim: true },
  attachmentNote: { type: String, default: 'Attachment Vendor Bill', trim: true },
  attachments: { type: [mongoose.Schema.Types.Mixed], default: [] },
  totalAmount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdByName: { type: String, default: '' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  updatedByName: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.ExpenseBill || mongoose.model('ExpenseBill', ExpenseBillSchema);
