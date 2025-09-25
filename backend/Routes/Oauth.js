const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful login
        // Generate JWT and send back to frontend or redirect with token
        const token = req.user.jwt;
        res.redirect(`myapp://oauth?token=${token}`);
    });

// GitHub OAuth
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
//     (req, res) => {
//         const token = req.user.jwt;
//         res.redirect(`myapp://oauth?token=${token}`);
//     });

module.exports = router;
