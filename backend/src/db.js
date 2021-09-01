import mongoose from 'mongoose';

const URIDEV = `mongodb+srv://${process.env.MONGO_USER}@cluster0masterwork.m6twl.mongodb.net/${process.env.MONGO_DB_DEV}?retryWrites=true&w=majority`;
const URITEST = `mongodb+srv://${process.env.MONGO_USER}@cluster0masterwork.m6twl.mongodb.net/${process.env.MONGO_DB_TEST}?retryWrites=true&w=majority`;
//const URI = process.env.NODE_ENV === 'test' ? URITEST : URIDEV;
const URI = URIDEV;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    
    console.log(`MongoDB Connected: ${db.connection.host} ${db.connection.port}`);
  } catch (err) {
    console.log(`Mongoose error on start: ${err.message}`);
    process.exit(1);
  }
  mongoose.connection.on('error', (err) => {
    // mongoose will attempt to reconnect
    throw new Error(`Mongoose connection error: ${err.message}`);
  });

  if (!process.env.NODE_ENV === 'test') {
    mongoose.connection.on('disconnected', () => {
      throw new Error('Mongoose disconnected.');
    });
  }
};

export default connectDB;