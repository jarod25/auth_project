var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jsonwebtoken');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET } = require('dotenv').config();

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
