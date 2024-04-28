const express = require('express');
const app = express();
const cors=require('cors')
const UserRoutes=require('./Routes/UserRoutes')
const TaskRoutes=require('./Routes/TaskRoutes')
const PORT = 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST','OPTIONS'], // Allow only GET and POST requests
  allowedHeaders: ['Accept','Content-Type','Access-Control-Allow-Origin','Access-Control-Allow-Methods','Access-Control-Allow-Headers'],
}));

app.use('/user',UserRoutes)
app.use('/task',TaskRoutes)

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMessage=err.message || "Something Went Wrong";
  return res.status(errorStatus).json({
      success:false,
      status:errorStatus,
      message:errorMessage,
      stack:err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
