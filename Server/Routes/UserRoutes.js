const express=require('express')
const fs = require('fs').promises;
const router=express.Router();
const {createError}=require('../error')

const JSON_FILE_PATH = 'User.json';

router.get('/all', async (req, res,next) => {
    try {
      const data = await fs.readFile(JSON_FILE_PATH, 'utf8');
      res.json(JSON.parse(data));
    } catch (err) {
      next(createError(500,'Internal server error'));
    }
  });
  
  router.post('/add', async (req, res,next) => {
    // const { id } = req.params;
    const newData = req.body;
    
    try {
      let data = JSON.parse(await fs.readFile(JSON_FILE_PATH, 'utf8'));
      // data = data.map(item => (item.id === parseInt(id) ? newData : item));
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify([...data,newData], null, 2));
      res.status(200).json({username:newData.username,id:newData.id})
    } catch (err) {
      next(createError(500,'Internal server error'));
    }
  });

  router.post('/signin', async (req, res,next) => {
    // const { id } = req.params;
    const newData = req.body;
    
    try {
      let data = JSON.parse(await fs.readFile(JSON_FILE_PATH, 'utf8'));
      if(!data.filter((f)=>f.username==newData.username).length>0)
      return next(createError(404,"User not found"))
      if(!data.filter((f)=>f.password==newData.password).length>0)
      return next(createError(404,"Wrong password"))

      const returnData=data.filter((f)=>f.username==newData.username)[0]
      res.status(200).json({username:returnData.username,id:returnData.id})
    } catch (err) {
      next(createError(500,'Internal server error'));
    }
  });

module.exports=router