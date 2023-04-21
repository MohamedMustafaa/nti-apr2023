const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt") //npm i bcrypt
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20,
    },
    lname: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      minLength: 5,
      maxLength: 20,
    },
    age: {
      type: Number,
      required: true,
      min: 21,
      max: 60,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email");
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //lowercase: true,
      //match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,  match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, match: /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    dOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, "ar-EG"))
          throw new Error("invalid number");
      },
    },
    addresses: [
      {
        addrName: {
          type: String,
          trim: true,
          //required: true,
          lowercase: true,
          minLength: 5,
          maxLength: 20,
        },
        addrDetails: {
          type: String,
          trim: true,
          //required: true,
          lowercase: true,
          minLength: 5,
          maxLength: 20,
        },
        image: {
          type: String,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//part dh 3lshn y3ml encrypt le password bdl ma hya zahra fe database
userSchema.pre("save", async function () {
  if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12)
})

//statics dh no3 function wa loginMe dh asmha => time 10:10PM
userSchema.statics.loginMe = async (email, password)=>{
  const userData = await userModel.findOne({email})
  if(!userData) throw new Error("invalid email")
  //console.log(userData.password);
  const matched = await bcrypt.compare(password, userData.password)
  //console.log(matched);
  if(!matched) throw new Error("invalid password")
  //console.log(userData)
  return userData
}

//hnst5dm methods 3lshn htt3mel m3a object
userSchema.methods.generateToken = async function(){
  const token = jwt.sign({_id: this._id}, process.env.JWTKEY) //JWTKEY=> password bta3y
  this.tokens.push({token})
  //this.tokens = this.tokens.concat({token}) // => another way
  await this.save()
  return token
}

const userModel = mongoose.model("User", userSchema)//export of schema
module.exports = userModel;
