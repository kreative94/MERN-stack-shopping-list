const express = require('express');
const router = express.Router();

router.get('/todoless', (req, res) => {
    console.log('about the product');
});

router.get('/creator', (req, res) => {
    console.log('the creator page')
})