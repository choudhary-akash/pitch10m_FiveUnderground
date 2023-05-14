const express = require("express");
const router = express.Router(); 
const VideoModel = require('./videoModel'); 
 

// ============================ -- api -- =============================== //
 

router.get("/videos",async function (req, res) {
    try {  
        let allData = await VideoModel.find().exec();
        console.log(allData);
        return res.status(200).send({ status: true, data: allData });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
})
 
router.get("/videos/:videoId",async function (req, res) {
    try {  
        let data = req.params.videoId;  
        let allData = await VideoModel.findOne({ cmsVideoId:data}).exec(); 
        return res.status(200).send({ status: true, data: allData });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
})

 
module.exports = router;