const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password)
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        let emailId = await User.findOne({ email });
        if (emailId) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        user = new User({ username, password, email });
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ userId: user.id, token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        console.log("user", user)
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            'secret',
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                let a = { userId: user.id, token, username: user.username, email: user.email }
                console.log("res", a)
                res.json(a);
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
