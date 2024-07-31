const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
        res.status(500).json({ msg: 'Server error' });
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
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                let a = { userId: user.id, token, username: user.username, email: user.email }
                console.log("res", a)
                res.json(a);
            }
        );
        // const token = jwt.sign({ userId: user._id, username: user.name }, JWT_SECRET, { expiresIn: '1h' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};





exports.updateUser = async (req, res, next) => {
    let a = req.params.id

    try {
        const { name, email, oldPassword, password, id } = req.body;
        if (!name || !email) {
            return res.status(400).send("Please fill email and name !!!")
        }
        if (!oldPassword && !password) {
            await User.findByIdAndUpdate(id, { email, name })
            let user = await User.findById(id)
            let userDetails = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            return res.status(200).send(userDetails);
        }
        if (!oldPassword) {
            return res.status(400).json({ msg: "Please fill Old Password." });
        }
        if (!password) {
            return res.status(400).json({ msg: "Please fill New Password." });
        }
        const user = await User.findById(id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (isMatch) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.findByIdAndUpdate(id, { email, name, password: hashedPassword })
            let user = await User.findById(id)

            let userDetails = {
                name: user.name,
                email: user.email,
                id: user._id
            }
            return res.status(200).json({ msg: userDetails });
        } else {
            return res.status(400).json({ msg: "Old Password is invalid.Please input proper old password. " });
        }



    } catch (err) {
        console.log(err)
        err.errorResponse.code == 11000 && res.status(409).json({ msg: "Email Already Exists" })
        next(err)
    }
}

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access denied');
    }
    console.log("jdxjdj11",token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("jdxjdj",decoded)
        req.user = decoded.user;

        next();
    } catch (error) {

        res.status(401).send('Invalid token');
    }
};