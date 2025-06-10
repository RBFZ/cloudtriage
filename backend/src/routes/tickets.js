const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get ticket by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new ticket (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query('INSERT INTO tickets (title, description) VALUES (?, ?)', [title, description]);
    const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router; 