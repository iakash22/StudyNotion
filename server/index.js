const express = require('express');
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const user = require('./routes/User');
const profile = require('./routes/Profile');
const course = require('./routes/Course');
const payment = require('./routes/Payment');
const fileUpload = require('express-fileupload');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors());

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/course', course);
app.use('/api/payment', payment);

app.get('/', async(req,res) => {
    res.send("Home");
})

cloudinaryConnect();
dbConnect();
app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});
