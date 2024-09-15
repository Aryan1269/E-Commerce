const express = require('express')
const router = express.Router();

router.get('/check',(req,res)=>{
    res.json({
        status : "success",
        message : "connection established",
    })
})

module.exports = router;