const express = require('express')
const multer  = require('multer')
const cors = require('cors');
const { MulterError } = require('multer');
const fs = require('fs');
const path = require('path');

const app = express()
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            fs.mkdirSync(path.join(process.cwd(), 'my-uploads'));
        }catch(e) {}

        cb(null, path.join(process.cwd(), 'my-uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage })

app.post('/aaa', upload.single('aaa'), function (req, res, next) {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
})

app.post('/bbb', upload.array('bbb', 2), function (req, res, next) {
    console.log('req.files', req.files);
    console.log('req.body', req.body);
}, function(err, req, res, next) {
    if (err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
        res.status(400).end('Too many files uploaded');
    } else {
        console.log(err);
        res.end('');
    }
})

app.post('/ccc', upload.fields([
    { name: 'aaa', maxCount: 3 },
    { name: 'bbb', maxCount: 2 }
]), function (req, res, next) {
    console.log('req.files', req.files);
    console.log('req.body', req.body);
})

app.post('/ddd', upload.any(), function(req, res, next) {
    console.log('req.files', req.files);
    console.log('req.body', req.body);
});
  
app.listen(3333);
