import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sectors: {
        type: Array,
        required: true,
    },
    term: {
        type: Boolean,
        required: true,
        default: false,
    },
    uid: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});


const Sector = mongoose.model("Sector", sectorSchema);

export default Sector;