const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


// Configurer les stratégies de connexion avec Google et GitHub
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // Vérifier si l'utilisateur est déjà dans la base de données
        // Si non, créer un nouveau compte utilisateur avec les informations de profil
        // Générer un JWT pour l'utilisateur et l'envoyer dans la réponse HTTP
    }
));

passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // Vérifier si l'utilisateur est déjà dans la base de données
        // Si non, créer un nouveau compte utilisateur avec les informations de profil
        // Générer un JWT pour l'utilisateur et l'envoyer dans la réponse HTTP
    }
));

// Créer des routes pour la connexion avec Google et GitHub
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Générer un JWT pour l'utilisateur et l'envoyer dans la réponse HTTP
    });

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Générer un JWT pour l'utilisateur et l'envoyer dans la réponse HTTP
    });

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`);
});