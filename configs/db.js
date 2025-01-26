import mongoose from 'mongoose';
import 'dotenv/config';

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

const dbConnect = async () => {
  try {
    mongoose.connect(mongoUri);
    console.log(`Database connected on port ${port}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default dbConnect;