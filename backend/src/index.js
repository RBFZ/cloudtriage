require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ticketsRouter = require('./routes/tickets');
app.use('/api/tickets', ticketsRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cloud Ticket System API!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 