import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// --- IN-MEMORY DATABASES ---
const users = [];
let activeSessions = []; // Tracks currently logged-in active sessions
let contacts = [
  { id: 1, name: "Sahil", email: "5 Stars ⭐", message: "Love the dark UI theme!" },
  { id: 2, name: "Alex", email: "5 Stars ⭐", message: "Interested in the Pro subscription plan." }
];

// Helper delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// --- MIDDLEWARE: VERIFY TOKEN (User or Admin) ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired session token.' });
  }
};

// --- AUTH ROUTES WITH REAL-TIME TERMINAL LOGGING ---

// 1. SIGNUP
app.post('/api/auth/signup', async (req, res) => {
  await delay();
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const existingUser = users.find(u => u.email === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), name, email: email.toLowerCase(), password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, name: newUser.name, email: newUser.email }, JWT_SECRET, { expiresIn: '2h' });

  // Track session
  activeSessions = activeSessions.filter(s => s.userId !== newUser.id);
  activeSessions.push({ userId: newUser.id, name: newUser.name, email: newUser.email, loggedInAt: new Date().toISOString() });

  // REAL-TIME TERMINAL LOG
  console.log(`\n========================================`);
  console.log(`✨ [NEW USER REGISTERED & LOGGED IN]`);
  console.log(`👤 User: ${newUser.name} (${newUser.email})`);
  console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
  console.log(`📊 Total Active Sessions: ${activeSessions.length}`);
  console.log(`========================================\n`);

  res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  await delay();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password.' });
  }

  const user = users.find(u => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log(`\n❌ [FAILED LOGIN ATTEMPT] Email: ${email} at ${new Date().toLocaleTimeString()}\n`);
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

  // Update active sessions tracking
  activeSessions = activeSessions.filter(s => s.userId !== user.id);
  activeSessions.push({ userId: user.id, name: user.name, email: user.email, loggedInAt: new Date().toISOString() });

  // REAL-TIME TERMINAL LOG
  console.log(`\n========================================`);
  console.log(`🔑 [USER LOGGED IN]`);
  console.log(`👤 User: ${user.name} (${user.email})`);
  console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
  console.log(`📊 Total Active Sessions: ${activeSessions.length}`);
  console.log(`========================================\n`);

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// 3. LOGOUT (Removes active user from session tracker)
app.post('/api/auth/logout', verifyToken, (req, res) => {
  if (req.user && req.user.id) {
    activeSessions = activeSessions.filter(s => s.userId !== req.user.id);

    console.log(`\n========================================`);
    console.log(`🚪 [USER LOGGED OUT]`);
    console.log(`👤 User: ${req.user.name || 'User'} (${req.user.email || 'N/A'})`);
    console.log(`⏰ Time: ${new Date().toLocaleTimeString()}`);
    console.log(`📊 Total Active Sessions Remaining: ${activeSessions.length}`);
    console.log(`========================================\n`);
  }

  res.json({ message: 'Logged out successfully.' });
});

// 4. PROTECTED ACCOUNT CHECK
app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// 5. ADMIN ACTIVE USERS LOG API
app.get('/api/admin/active-users', (req, res) => {
  res.json({
    totalActiveUsers: activeSessions.length,
    sessions: activeSessions
  });
});

// --- CONTACTS & ADMIN CRUD ROUTES ---

app.get('/api/contacts', async (req, res) => {
  await delay();
  res.json(contacts);
});

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

// Admin Authentication Login
app.post('/api/admin/login', async (req, res) => {
  await delay();
  const { password } = req.body;
  if (password === 'admin123') {
    const token = jwt.sign({ role: 'admin', name: 'Admin Console' }, JWT_SECRET, { expiresIn: '2h' });
    
    console.log(`\n🛡️ [ADMIN CONSOLE UNLOCKED] Time: ${new Date().toLocaleTimeString()}\n`);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ error: "Invalid admin password." });
});

// Admin PUT (Update Record)
app.put('/api/contacts/:id', verifyToken, async (req, res) => {
  await delay();
  const { id } = req.params;
  const { name, email, message } = req.body;
  const index = contacts.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Record not found." });
  contacts[index] = { ...contacts[index], name, email, message };
  
  console.log(`📝 [RECORD UPDATED] ID #${id} by ${req.user.name || req.user.role || 'User'}`);
  res.json(contacts[index]);
});

// Admin DELETE (Remove Record)
app.delete('/api/contacts/:id', verifyToken, async (req, res) => {
  await delay();
  const { id } = req.params;
  contacts = contacts.filter(c => c.id !== parseInt(id));

  console.log(`🗑️ [RECORD DELETED] ID #${id} by ${req.user.name || req.user.role || 'User'}`);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
