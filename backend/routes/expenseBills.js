const express = require('express');
const mongoose = require('mongoose');
const ExpenseBill = mongoose.models.ExpenseBill || require('../models/ExpenseBill');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Strictly Admin & Superadmin only
router.use(verifyToken);
router.use(requireRole('superadmin', 'admin'));

function sanitizeRows(rawRows) {
  if (!Array.isArray(rawRows)) return [];
  return rawRows.map((r, idx) => {
    const amt = (r && r.amount !== '' && r.amount !== null && r.amount !== undefined && !isNaN(Number(r.amount)))
      ? Number(r.amount)
      : null;
    const orig = (r && (r.originalBillReceived === 'Yes' || r.originalBillReceived === 'No'))
      ? r.originalBillReceived
      : '';
    return {
      srNo: idx + 1,
      date: r && r.date ? String(r.date).trim() : '',
      vendorName: r && r.vendorName ? String(r.vendorName).trim() : '',
      billNo: r && r.billNo ? String(r.billNo).trim() : '',
      amount: amt,
      particulars: r && r.particulars ? String(r.particulars).trim() : '',
      originalBillReceived: orig,
      remarks: r && r.remarks ? String(r.remarks).trim() : ''
    };
  });
}

function calcTotal(rows) {
  return rows.reduce((sum, r) => sum + (typeof r.amount === 'number' && !isNaN(r.amount) ? r.amount : 0), 0);
}

// GET /api/expense-bills - List all non-deleted sheets
router.get('/', async (req, res) => {
  try {
    const bills = await ExpenseBill.find({ isDeleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load expense bills: ' + err.message });
  }
});

// GET /api/expense-bills/:id - Get single sheet
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid expense bill ID' });
    }
    const bill = await ExpenseBill.findOne({ _id: req.params.id, isDeleted: { $ne: true } }).lean();
    if (!bill) return res.status(404).json({ error: 'Expense bill sheet not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expense bill: ' + err.message });
  }
});

// POST /api/expense-bills - Create new sheet
router.post('/', async (req, res) => {
  try {
    const {
      sheetDate,
      rows,
      preparedBy,
      checkedBy,
      approvedBy,
      attachmentNote,
      attachments
    } = req.body;

    const cleanRows = sanitizeRows(rows);
    const totalAmount = calcTotal(cleanRows);

    const doc = new ExpenseBill({
      sheetDate: sheetDate ? String(sheetDate).trim() : '',
      rows: cleanRows,
      preparedBy: preparedBy !== undefined ? String(preparedBy).trim() : 'Varsha Jyotishi',
      checkedBy: checkedBy !== undefined ? String(checkedBy).trim() : 'Urna Banerji',
      approvedBy: approvedBy !== undefined ? String(approvedBy).trim() : 'Aashit shah',
      attachmentNote: attachmentNote !== undefined ? String(attachmentNote).trim() : 'Attachment Vendor Bill',
      attachments: Array.isArray(attachments) ? attachments : [],
      totalAmount,
      createdBy: req.user._id,
      createdByName: req.user.name || 'Admin',
      updatedBy: req.user._id,
      updatedByName: req.user.name || 'Admin'
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save expense bill: ' + err.message });
  }
});

// PUT /api/expense-bills/:id - Update existing sheet
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid expense bill ID' });
    }
    const doc = await ExpenseBill.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
    if (!doc) return res.status(404).json({ error: 'Expense bill sheet not found' });

    const {
      sheetDate,
      rows,
      preparedBy,
      checkedBy,
      approvedBy,
      attachmentNote,
      attachments
    } = req.body;

    if (sheetDate !== undefined) doc.sheetDate = String(sheetDate).trim();
    if (Array.isArray(rows)) {
      doc.rows = sanitizeRows(rows);
      doc.totalAmount = calcTotal(doc.rows);
    }
    if (preparedBy !== undefined) doc.preparedBy = String(preparedBy).trim();
    if (checkedBy !== undefined) doc.checkedBy = String(checkedBy).trim();
    if (approvedBy !== undefined) doc.approvedBy = String(approvedBy).trim();
    if (attachmentNote !== undefined) doc.attachmentNote = String(attachmentNote).trim();
    if (Array.isArray(attachments)) doc.attachments = attachments;

    doc.updatedBy = req.user._id;
    doc.updatedByName = req.user.name || 'Admin';

    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update expense bill: ' + err.message });
  }
});

// DELETE /api/expense-bills/:id - Soft delete sheet
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid expense bill ID' });
    }
    const doc = await ExpenseBill.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, updatedBy: req.user._id, updatedByName: req.user.name || 'Admin' },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Expense bill sheet not found' });
    res.json({ ok: true, id: doc._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense bill: ' + err.message });
  }
});

module.exports = router;
