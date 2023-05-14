const express = require("express");
const router = express.Router(); 
const VideoModel = require('./videoModel'); 
const axios = require('axios');
 

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

router.post("/getQuestions", async function (req, res) {
	try {
        let { subjectId, chapterId, topicId, subtopicId } = req.body;
        // let qnRes = await axios.post();
        let token = await generateToken();

        let qbQuestions = await fetchQuestionsFromQB(token, {
					subjectId, chapterId, topicId, subtopicId
				});

        let questions = qbQuestions.map(qn => {
            let question = {
                "questionText": qn.question?.question_text,
                "answerOptions": qn.question?.answer_options,
                "correctAnswer": qn.question?.correct_answer,
                "solution": qn.question?.solution[0]?.data
            };
            
            return question;
        });

        return res.status(200).send({ status: true, data: questions });
	} catch (err) {
		return res.status(500).send({ status: false, msg: err.message });
	}
})

async function fetchQuestionsFromQB(token, toc) {
    const axios = require('axios');
    let data = JSON.stringify({
        "pageNumber": 1,
        "pageSize": 5,
        "question_type": {
            "values": [
                // Single correct mcq type question
                "20fbaaec-85fa-42be-8d10-7d442e982301"
            ],
            "is_not_enabled": false
        },
        "toc": {
            "subject_id": [
                toc.subjectId
            ],
            "chapter_id": [
                toc.chapterId
            ],
            "topic_id": [
                toc.topicId
            ],
            "sub_topic_id": [
                toc.subtopicId
            ],
        },
        "fetchall": true
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://newqbapi.infinitylearn.com/questions/getAllQuestions',
        headers: { 
            'accept': 'application/json, text/plain, */*', 
            'authorization': `Bearer ${token}`, 
            'content-type': 'application/json', 
            'x-tenant': 'infinitylearn'
        },
        data: data
    };

    let response = await axios.request(config);
    return response.data.data;
}

async function generateToken() {
    const axios = require('axios');
    let data = JSON.stringify({
        "password": "test123",
        "uid": "admin01"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.infinitylearn.com/api/authentication/login',
        headers: { 
            'X-Tenant': 'srichaitanya', 
            'Content-Type': 'application/json'
        },
        data: data
    };

    let response = await axios.request(config);
    return response.data.accessToken;
}
 
module.exports = router;