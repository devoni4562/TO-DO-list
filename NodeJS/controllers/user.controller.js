const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(async hash => {
            const user = await UserModel.create({
                email: req.body.email,
                pseudo: req.body.pseudo,
                password: hash
            });
            res.status(201).json({message: 'Utilisateur créé !'});
        })
        .catch(err => res.status(500).json({err}));
};


module.exports.login = (req, res, next) => {
    UserModel.findOne({ // Sensible à la casse.
        $or: [
            {email: req.body.identity},
            {pseudo: req.body.identity}
        ]
    })
        .then(
            user => {
                if (user === null) {
                    res.status(401).json({message: 'identifiant/mot de passe incorrect'});
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({message: 'identifiant/mot de passe incorrect'});
                            } else {
                                res.status(200).json({
                                    userId: user._id,
                                    token: jwt.sign(
                                        {userId: user._id},
                                        process.env.JWT_KEY, // Clef non sécurisé : utilisation de cette clef dans un but purement 'scolaire'.
                                        {expiresIn: '24h'}
                                    )
                                });
                            }
                        })
                        .catch(err => res.status(500).json({err}));
                }

            }
        )
        .catch(err => res.status(500).json({err}));
};

