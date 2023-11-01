import USER from "../mongo/models/user.js"

export const checkDuplicateEmail = (req, res, next) => {
    USER.findOne({ email: req.body.email })
        .then(user => {
            if (user) return res.status(400).send({ message: 'Failed! Email already In Use' });
            next();
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        });

};