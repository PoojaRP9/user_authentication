const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://kriya:sVLmPI0HFNmco5Jq@food.uewescf.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("database connected");
}).catch(() => {
    console.log("Database Error");
})