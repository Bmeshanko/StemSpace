const mongoose = require("mongoose");

const dmSchema = {
    content: String,
    author: String,
    target : String
}

const DM = mongoose.model("DM", dmSchema);

module.exports = DM;