import mongoose from 'mongoose';


const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('Data has been connected')
    } catch(error){

        console.error('Database connection error:', error);
    }
}
export default dbConnect;