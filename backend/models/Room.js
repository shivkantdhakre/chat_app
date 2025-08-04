import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
