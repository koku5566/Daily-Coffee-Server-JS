const News = require('../model/news');

//const JsonWebTokenError =require('jsonwebtoken');
const multer = require('multer');


const getNews=( req, res, next) =>{
    //select news
    News.findAll().then(news=>{
        return res.json(news);
    })
}

// configure the multer middleware to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

const addNews = ( req, res, next)=>{
    console.log(req.body);
    upload.single('newsImage')(req,res,err=>{
        if (err instanceof multer.MulterError) {
            // handle any multer errors
            console.error('Multer error:', err);
            res.status(500).json({ message: 'Error uploading file.' });
          } else if (err) {
            // handle any other errors
            console.error('Upload error:', err);
            res.status(500).json({ message: 'Error uploading file.' });
          } else {
            // extract the file data from the request and create the news object
            const news = {
              newsTitle: req.body.newsTitle,
              newsContent: req.body.newsContent,
              newsImage: req.file.buffer,
            };
            News.create(news)
                .then(() => {
                    res.status(200).json({ message: "News Created" });
                })
                .catch(err => {
                    console.log(err);
                    res.status(502).json({ message: "error while creating the news" });
                });
        }
      
    })
   
}
module.exports = {
    getNews,addNews
};