import express from 'express';
const fs = require ('fs')
const format = require ('date-fns')
const path = require ('path')

const app = express();
const PORT = 4000;


app.use(express.json());


app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `<div><p style="font-size: 35px;text-align:center;">Hi! Welcome to my website <br /> <span style="font-size: 20px;"> This is Node js Filesystem - Current Timestamp Task</span></p></div>`
    );
});

app.get("/create", (req, res) => {
  const currentDateTime = format(new Date(), "yyyy-MM-dd-HH-mm-ss");
  const filePath = `TimeStamps/${currentDateTime}.txt`;
  fs.writeFileSync(filePath, currentDateTime, "utf-8");
  res.status(200).json({ message: "Text file created successfully", filePath });
});


app.get("/files", (req, res) => {
  const folderPath = "TimeStamps";
  fs.readdir(folderPath, (err, files) => {
    const textFiles = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json({ files: textFiles });
  });
});


app.listen(PORT, () => {
  console.log(`App is running on Port = ${PORT} successfully`);
});