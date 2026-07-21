import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_super_secret_admin_key_123'; // Secret key for signing tokens

app.use(cors());
app.use(express.json());

// In-memory database array storing feedback/contacts
let contacts = [
  { id: 1, name: "Sahil", email: "5 Stars ⭐", message: "Love the dark UI theme!" },
  { id: 2, name: "Alex", email: "5 Stars ⭐", message: "Interested in the Pro subscription plan." }
];

// Helper delay to simulate real network latency
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- Middleware: Verify Admin JWT Token ---
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized: Missing or invalid token format." });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden: Invalid or expired token." });
  }
};

// --- PUBLIC ROUTES ---

// 1. Root Test Route
app.get('/', (req, res) => {
  res.send('🚀 Secure API Server is running live!');
});

// 2. GET all contacts/reviews (Public)
app.get('/api/contacts', async (req, res) => {
  await delay();
  res.json(contacts);
});

// 3. POST new contact/review (Public)
app.post('/api/contacts', async (req, res) => {
  await delay();
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All input fields are required." });
  }
  const newContact = { id: Date.now(), name, email, message };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// 4. ADMIN LOGIN ROUTE (Public)
app.post('/api/admin/login', async (req, res) => {
  await delay();
  const { password } = req.body;

  // Admin password set here
  if (password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ success: true, token });
  }

  return res.status(401).json({ error: "Invalid admin password." });
});

// --- PROTECTED ADMIN ROUTES ---

// 5. PUT update record (Admin Only)
app.put('/api/contacts/:id', authenticateAdmin, async (req, res) => {
  await delay();
  const { id } = req.params;
  const { name, email, message } = req.body;

  const index = contacts.findIndex(c => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Record not found." });
  }

  contacts[index] = { ...contacts[index], name, email, message };
  res.json(contacts[index]);
});

// 6. DELETE record (Admin Only)
app.delete('/api/contacts/:id', authenticateAdmin, async (req, res) => {
  await delay();
  const { id } = req.params;
  const initialLength = contacts.length;
  contacts = contacts.filter(c => c.id !== parseInt(id));

  if (contacts.length === initialLength) {
    return res.status(404).json({ error: "Record not found." });
  }

  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Secure backend server running at http://localhost:${PORT}`);
});
