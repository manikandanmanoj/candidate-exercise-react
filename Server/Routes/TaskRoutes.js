const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const {createError}=require('../error')

const JSON_FILE_PATH = "Task.json";

router.get("/all/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(JSON_FILE_PATH, "utf8");
    const resData=JSON.parse(data)
    res.status(200).json(resData.filter((f) => f.userId === id));
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
});

router.post("/add/:id", async (req, res, next) => {
  const { id } = req.params;
  const newData = { ...req.body, userId: id };

  try {
    let data = JSON.parse(await fs.readFile(JSON_FILE_PATH, "utf8"));
    await fs.writeFile(
      JSON_FILE_PATH,
      JSON.stringify([...data, newData], null, 2)
    );
    res.status(200).json('Successfully Saved');
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
});

router.post("/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    let data = JSON.parse(await fs.readFile(JSON_FILE_PATH, "utf8"));
    const filterGetData = data.findIndex((f) => f.id == id);  
    data.splice(filterGetData, 1);
    data.splice(filterGetData, 0, newData);
    await fs.writeFile(
      JSON_FILE_PATH,
      JSON.stringify(data, null, 2)
    );
    res.status(200).json('Update successfully');
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
});

router.post("/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    let data = JSON.parse(await fs.readFile(JSON_FILE_PATH, "utf8"));
    let removeData=data.filter(f=>f.id!==id)
    await fs.writeFile(
      JSON_FILE_PATH,
      JSON.stringify(removeData, null, 2)
    );
    res.status(200).json('Delete successfully');
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
});

module.exports = router;
