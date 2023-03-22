import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    match: /^\d{11}$/,
  },
  telefone: {
    type: String,
    match: /^\d{10,13}$/,
  },
  address: [
    {
      addressName: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: Number, required: true },
      complement: { type: String },
      district: { type: String, required: true },
      zipCode: {
        type: String,
        required: true,
        match: /^\d{8}$/,
      },
      city: { type: String, required: true },
      uf: {
        type: String,
        required: true,
        match: /^(\s*(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)?)$/gmi,
      },
    },
  ],
  cart: {
    products: [],
  },
}, {
  versionKey: false,
});

userSchema.pre('save', function hashPassword(next) {
  const user = this;
  if (this.isModified || this.isNew) {
    bcrypt.genSalt(12, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }
      bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

export default User;
