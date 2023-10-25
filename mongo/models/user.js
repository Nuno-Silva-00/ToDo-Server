import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, requidred: true },
    allToDos: [{ type: mongoose.Schema.Types.ObjectId, ref: "ToDo" }],
});

const USER = mongoose.model("User", UserSchema);
export default USER;