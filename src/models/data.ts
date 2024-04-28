import mongoose from "../db"

const dataSchema = new mongoose.Schema({
    phone: {
        required: true,
        type: String
    },
    date: {
        required: false,
        type: Date
    }
})

module.exports = mongoose.model('Data', dataSchema)