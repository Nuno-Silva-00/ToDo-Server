import USER from "../mongo/models/user.js";
import TODO from "../mongo/models/todo.js";

const createToDo = async (req, res) => {
    const { todo } = req.body;
    const userId = req.userId;

    try {
        const user = await USER.findById(userId);
        if (!user) throw new Error("User not Found!");

        const newToDo = await TODO.create({
            todo,
            createdAt: new Date().toISOString(),
            creator: userId
        });

        await USER.findOneAndUpdate({ _id: userId }, { $push: { allToDos: newToDo._id } })
        res.status(200).json({ newToDo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToDo = async (req, res) => {
    const userId = req.userId;
}
const updateToDo = async (req, res) => {
    const userId = req.userId;
}
const deleteToDo = async (req, res) => {
    const userId = req.userId;
}



export { createToDo, getToDo, updateToDo, deleteToDo };