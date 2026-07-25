import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static('uploads'));

// --- MULTER STORAGE CONFIGURATION ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer Upload Instance for General & Standalone Uploads
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|pdf|docx/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtensions.test(file.mimetype) || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    if (extName && mimeType) {
      return cb(null, true);
    }
    cb(new Error('Only PNG, JPG, JPEG, PDF, and DOCX files are allowed.'));
  }
});

// In-Memory Databases
const users = [];
let activeSessions = [];
let feedbackSubmissions = [];
let uploadedFiles = [];
let contacts = [
  { id: 1, name: "Sahil", email: "5 Stars ⭐", message: "Love the dark UI theme!" },
  { id: 2, name: "Alex", email: "5 Stars ⭐", message: "Interested in the Pro subscription plan." }
];

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Middleware: Verify Token
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

// --- WEEK 4 TASK 1: STANDALONE FILE/IMAGE UPLOAD ENDPOINT ---
app.post('/api/upload', (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please select a file to upload.' });
    }

    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    const fileRecord = {
      id: Date.now(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      uploadedAt: new Date().toISOString()
    };

    uploadedFiles.push(fileRecord);

    console.log(`\n========================================`);
    console.log(`📁 [NEW FILE UPLOADED]`);
    console.log(`📄 Name: ${req.file.originalname}`);
    console.log(`⚖️ Size: ${(req.file.size / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`🔗 Link: ${fileUrl}`);
    console.log(`========================================\n`);

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      file: fileRecord
    });
  });
});

// Endpoint to list all uploaded files
app.get('/api/uploads', async (req, res) => {
  await delay();
  res.json(uploadedFiles);
});

// --- WEEK 3 TASK 2: MULTI-FIELD FEEDBACK ENDPOINT ---
app.post('/api/feedback', (req, res, next) => {
  upload.single('attachment')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File upload error.',
        fieldErrors: { attachment: err.message }
      });
    }
    next();
  });
}, async (req, res) => {
  await delay(800); // Simulate network latency

  const { fullName, email, category, rating, experienceDate, comments } = req.body;
  const errors = {};

  // STRICT SERVER-SIDE VALIDATION
  if (!fullName || fullName.trim().length < 3) {
    errors.fullName = 'Full Name must be at least 3 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!category || category === '') {
    errors.category = 'Please select a valid feedback category.';
  }

  const numericRating = Number(rating);
  if (!rating || numericRating < 1 || numericRating > 5) {
    errors.rating = 'Rating must be between 1 and 5 stars.';
  }

  if (!experienceDate) {
    errors.experienceDate = 'Experience date is required.';
  } else if (new Date(experienceDate) > new Date()) {
    errors.experienceDate = 'Experience date cannot be set in the future.';
  }

  if (!comments || comments.trim().length < 10) {
    errors.comments = 'Feedback comments must be at least 10 characters long.';
  }

  if (!req.file) {
    errors.attachment = 'A file attachment (screenshot or document) is required.';
  }

  if (Object.keys(errors).length > 0) {
    console.log(`\n❌ [SERVER VALIDATION REJECTED]`, errors, `\n`);
    return res.status(400).json({
      success: false,
      message: 'Server-side validation failed.',
      fieldErrors: errors
    });
  }

  const newFeedback = {
    id: Date.now(),
    fullName,
    email,
    category,
    rating: numericRating,
    experienceDate,
    comments,
    fileUrl: `/uploads/${req.file.filename}`,
    submittedAt: new Date().toISOString()
  };

  feedbackSubmissions.push(newFeedback);

  console.log(`\n========================================`);
  console.log(`📋 [NEW DETAILED FEEDBACK RECEIVED]`);
  console.log(`👤 Name: ${fullName} (${email})`);
  console.log(`🏷️ Category: ${category} | ⭐ Rating: ${rating}/5`);
  console.log(`📅 Date: ${experienceDate}`);
  console.log(`📁 File Saved: ${req.file.filename}`);
  console.log(`========================================\n`);

  res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully!',
    data: newFeedback
  });
});

app.get('/api/feedback', async (req, res) => {
  await delay();
  res.json(feedbackSubmissions);
});

// --- AUTH ROUTES ---
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

  activeSessions = activeSessions.filter(s => s.userId !== newUser.id);
  activeSessions.push({ userId: newUser.id, name: newUser.name, email: newUser.email, loggedInAt: new Date().toISOString() });

  res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

app.post('/api/auth/login', async (req, res) => {
  await delay();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password.' });
  }

  const user = users.find(u => u.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

  activeSessions = activeSessions.filter(s => s.userId !== user.id);
  activeSessions.push({ userId: user.id, name: user.name, email: user.email, loggedInAt: new Date().toISOString() });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.post('/api/auth/logout', verifyToken, (req, res) => {
  if (req.user && req.user.id) {
    activeSessions = activeSessions.filter(s => s.userId !== req.user.id);
  }
  res.json({ message: 'Logged out successfully.' });
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

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

app.post('/api/admin/login', async (req, res) => {
  await delay();
  const { password } = req.body;
  if (password === 'admin123') {
    const token = jwt.sign({ role: 'admin', name: 'Admin Console' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ error: "Invalid admin password." });
});

app.put('/api/contacts/:id', verifyToken, async (req, res) => {
  await delay();
  const { id } = req.params;
  const { name, email, message } = req.body;
  const index = contacts.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Record not found." });
  contacts[index] = { ...contacts[index], name, email, message };
  res.json(contacts[index]);
});

app.delete('/api/contacts/:id', verifyToken, async (req, res) => {
  await delay();
  const { id } = req.params;
  contacts = contacts.filter(c => c.id !== parseInt(id));
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
