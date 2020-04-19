const express = require('express');
const covidController = require('../../controllers/covidController');


const router = express.Router();

router.get('*', async (req, res) => {
  //passthrough 
  console.log(req.path);
  const result = await covidController.get(req.path);
res.json((result.data));
  
});

module.exports = router;