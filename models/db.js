const mongoose=require('mongoose');
const dbConnection=async()=>{
    try {
        const connectiondb =await mongoose.connect('mongodb+srv://yousaf:yousaf03448307585@cluster0.igtgl.mongodb.net/?retryWrites=false&w=majority').then((data) => console.log('DB Coonected...'));
console.log('db  successfully connected...')

    } catch (error) {
        console.log('db  not connected')
    }
}

module.exports=dbConnection;