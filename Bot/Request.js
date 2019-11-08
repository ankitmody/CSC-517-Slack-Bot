const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    endpointName: {
        method: String,
        required: true
    }
});

module.exports = mongoose.model("Tasks", TaskSchema);