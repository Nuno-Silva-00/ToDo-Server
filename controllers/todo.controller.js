import USER from "../mongo/models/user.js";
import TODO from "../mongo/models/todo.js";
//still need to add tokens
const createToDo = async (req, res) => {
    try {
        const { id, todo } = req.body;
        const user = await USER.findById(id);
        if (!user) throw new Error("User not Found!");

        const newToDo = await TODO.create({
            todo,
            createdAt: new Date().toISOString(),
            creator: id
        });

        await USER.findOneAndUpdate({ _id: id }, { $push: { allToDos: newToDo._id } })
        res.status(200).json({ newToDo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getToDo = async (req, res) => {

}
const updateToDo = async (req, res) => {

}
const deleteToDo = async (req, res) => {

}



export { createToDo, getToDo, updateToDo, deleteToDo };