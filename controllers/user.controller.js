import USER from "../mongo/models/user.js";
import bcrypt from 'bcrypt';

//falta tokens 
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await USER.findOne({ email });

        if (userExists)
            return res.status(200).json({ message: 'Email already Exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await USER.create({ name, email, password: hashedPassword });

        res.status(200).json({ id: newUser.id, name: newUser.name, allToDos: newUser.allToDos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//falta token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await USER.findOne({ email });

        if (!userExists)
            return res.status(400).json({ message: 'Email not Found!' });

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (passwordMatch)
            return res.status(200).json({ id: userExists.id, name: userExists.name, allToDos: userExists.allToDos });
        else
            return res.status(400).json({ message: 'Wrong Password!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { createUser, loginUser };