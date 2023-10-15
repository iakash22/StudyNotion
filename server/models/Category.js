const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String,
    },
    description : {
        type : String,
    },
    courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    }]
});

module.exports = mongoose.model("Category", categorySchema); 