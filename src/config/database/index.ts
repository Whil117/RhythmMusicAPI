/* eslint-disable no-console */
import CONFIG from '@Config/index';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB).then(() => {
      console.log(
        '-------------------------------MONGO_DB_CONNECTED-------------------------------'
      );
    });
  } catch (error) {
    process.exit(1);
  }
};
export default ConnectMongoDB;
