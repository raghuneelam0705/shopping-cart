import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    console.log("Register request body:", req.body);
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
            [email, hashed]
        );
        console.log("User registered:", result.rows);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'User already exists or DB error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log("User found:", user.rows);
    if (user.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.rows[0].id }, 'scdpclient', { expiresIn: '1h' });
    // 🍪 Set HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: true, // only HTTPS in prod
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: 'Logged in successfully' });
});

export default router;
