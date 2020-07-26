const express = require('express');
const app = require('./app');
const config = require('./config');

const { PORT } = config;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));