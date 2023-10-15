const mongoose = require('mongoose');
const emailSender = require('../utils/emailSender');
const {otpSendMail} = require('../mail/templates/otpSend');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');

const otpSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required :true,
    },
    createdAt : {
        type : String,
        default : Date.now(),
        expires : 5*60,
    }
});


const sendVerfication = async(email, otp) => {
    try{
        const mailResponse = await emailSender(email, "studyNotion - confirmation code",otpSendMail(otp));
        console.log(mailResponse);
    }catch(err){
        console.log('Error occured while sending mails: ', err);
        throw err;
    }
};

otpSchema.pre("save", async function(next){
    await sendVerfication(this.email, this.otp);
    next();
});


module.exports = mongoose.model("OTP", otpSchema);