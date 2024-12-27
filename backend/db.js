import mongoose from 'mongoose';


const connectToMongo = async  () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/mern_graphql', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
}

  
export default connectToMongo;
