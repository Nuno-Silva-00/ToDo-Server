import USER from "../mongo/models/user.js";
//still need to add hashing, and tokens 
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await USER.findOne({ email });
       
        if (userExists)
            return res.status(200).json({ message: 'Email already Exists' });

        const newUser = await USER.create({ name, email, password });

        res.status(200).json({ id: newUser.id, name: newUser.name, email: newUser.email, allToDos: newUser.allToDos });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await USER.findOne({ email });
        const passwordMatch = password === userExists.password;

        if (passwordMatch)
            return res.status(200).json({ id: userExists.id, name: userExists.name, email: userExists.email, allToDos: userExists.allToDos });
        else
            return res.status(400).json({ message: 'User not found!' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { createUser, loginUser };