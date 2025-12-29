require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const app = express();
app.use(cors());

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try{
    if(!req.file) return res.status(400).json({error:'no file'});
    const key = `uploads/${Date.now()}-${req.file.originalname}`;
    await s3.putObject({ Bucket: process.env.S3_BUCKET, Key: key, Body: req.file.buffer, ACL:'public-read', ContentType: req.file.mimetype }).promise();
    const url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ url });
  }catch(e){ console.error(e); res.status(500).json({error:'upload failed'}); }
});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('backend listening on', port));
