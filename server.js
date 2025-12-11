require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

let pool;
async function initDb() {
  pool = await mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'NextGEN_TechHub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

app.post('/api/contact', async (req, res) => {
  const { Name, Email, Message } = req.body;
  if (!Name || !Email || !Message) return res.status(400).json({ error: 'Missing fields' });
  try {
    const [result] = await pool.execute(
      'INSERT INTO Contact (Name, Email, Message) VALUES (?, ?, ?)',
      [Name, Email, Message]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/register', async (req, res) => {
  const { Name, Email, EventName, Project } = req.body;
  if (!Name || !Email || !EventName) return res.status(400).json({ error: 'Missing fields' });
  try {
    const [result] = await pool.execute(
      'INSERT INTO Events_Register (Name, Email, EventName, Project) VALUES (?, ?, ?, ?)',
      [Name, Email, EventName, Project || '']
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/join', async (req, res) => {
  const { Name, Email, Bio } = req.body;
  if (!Name || !Email) return res.status(400).json({ error: 'Missing fields' });
  try {
    const [result] = await pool.execute(
      'INSERT INTO TeamMembers (Name, Email, Bio) VALUES (?, ?, ?)',
      [Name, Email, Bio || '']
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

initDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to initialize DB pool', err);
  process.exit(1);
});
