const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'This service is running properly',
    code: 200,
  });
});

module.exports = router;
