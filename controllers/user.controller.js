import USER from "../mongo/models/user.js";
//still need to add hashing, and tokens 
const createUser = async (req, res) => {
    try {
        console.log('1');
        const { name, email, password } = req.body;
        console.log(req.body);
        const userExists = await USER.findOne({ email });
        console.log(userExists);

        if (userExists) return res.status(200).json({ message: 'Email already Exists' });
        console.log("2");
        const newUser = await USER.create({ name, email, password });
        console.log(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await USER.findOne({ email });
        const passwordMatch = password === userExists.password;

        if (passwordMatch) return res.status(200).json(userExists);
        else return res.status(400).json({ message: 'User not found!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUser, loginUser };