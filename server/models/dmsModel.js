const mongoose = require("mongoose");

const dmSchema = {
    messages: [{
            author: String,
            content:String
    }],
    check: Boolean,
    creator: String,
    user : String
}

const DM = mongoose.model("DM", dmSchema);

module.exports = DM;