const express = require('express');
const router = express.Router();
const path = require('path');
// const authController = require('../controller/controller');

// import '../html/'

router.get('/index', (req, res) => {
        // console.error("bataa");
        // res.render("index", { username: req.session.username });
        res.sendFile(path.join(__dirname + '/../index.html'));

});

router.get("/club", (req, res) => {
    
        res.sendFile(path.join(__dirname + '/../html/club.html'));
    
})

router.get("/competition", (req, res) => {
    
        res.sendFile(path.join(__dirname + '/../html/competition.html'));
    
})

router.get("/place", (req, res) => {
    
        res.sendFile(path.join(__dirname + '/../html/place.html'));
    
})
router.get("/rule", (req, res) => {
    
        res.sendFile(path.join(__dirname + '/../html/rule.html'));
    
})



router.get("/tools", (req, res) => {
    
        res.sendFile(path.join(__dirname + '/../html/tools.html'));
    
})
router.get("/component" , (req , res)=>{
    res.sendFile(path.join(__dirname+ '/../component/tools.html'))
})




module.exports = router;