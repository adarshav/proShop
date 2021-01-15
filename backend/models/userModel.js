import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, //It means the user who has registered will not be admin.
    },
  },
  {
    timestamps: true, //we can make another field in model called createdAt for the timings but mongoose gives the facility of passing options as timestamps
  }
);

// custom method to compare the password for login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// middleware to encrypt the password while saving [registering the user]
// we need not include it in routes or controller before saving it will execute
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  // hash the password
  const salt = await bcrypt.genSalt(10); //10 is number of rounds
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);

export default User;
