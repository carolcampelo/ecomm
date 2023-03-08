import mongoose from 'mongoose';

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

const users = mongoose.model('users', userSchema);

export default users;
