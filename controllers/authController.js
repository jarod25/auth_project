const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');


exports.test = (req, res) => {
  res.status(200).send({ message: 'Authentification réussie !' });
};


exports.register = (req, res) => {
  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(409).send({ message: 'Cet email est déjà utilisé.' });
      } else {
      
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({ message: 'Une erreur s\'est produite.' });
          } else {
           
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash
            });

            user.save()
              .then(() => {
                res.status(201).send({ message: 'Utilisateur créé avec succès.' });
              })
              .catch(() => {
                res.status(500).send({ message: 'Une erreur s\'est produite.' });
              });
          }
        });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Une erreur s\'est produite.' });
    });
};


exports.login = (req, res) => {
  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Email ou mot de passe incorrect.' });
      } else {
      
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(500).send({ message: 'Une erreur s\'est produite.' });
          } else {
            if (!result) {
              return res.status(401).send({ message: 'Email ou mot de passe incorrect.' });
            } else {
             
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
              res.status(200).send({ token: token });
            }
          }
        });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'Une erreur s\'est produite.' });
    });
};