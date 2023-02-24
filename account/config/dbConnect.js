import mongoose from "mongoose";

mongoose.connect('mongodb://admin:secret@mongo-ecomm:27017/ecomm-account?authSource=admin')

let db = mongoose.connection;

export default db;