require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const users = []; // Simple in-memory users

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.email === profile.emails[0].value);
    if (!user) {
        user = { email: profile.emails[0].value, oauthProvider: 'google' };
        users.push(user);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
    const user = users.find(u => u.email === email);
    done(null, user || null);
});

// Email/password login
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    let user = users.find(u => u.email === email);
    if (!user) {
        user = { email, password };
        users.push(user);
    }
    if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
    req.session.user = user;
    res.json({ message: 'Login successful' });
});

// Google OAuth routes
app.get('/oauth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/oauth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Redirect to custom protocol for Electron
    res.redirect(`myapp://oauth-success`);
});

// Optional: check session
app.get('/auth/me', (req, res) => {
    if (req.session.user) res.json({ user: req.session.user });
    else res.status(401).json({ message: 'Not logged in' });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
