/* eslint-disable no-unused-vars */
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors({ origin: true, credentials: true }));
  app.use(morgan('combined', {
    skip(req, res) { return process.env.NODE_ENV === 'test'; },
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
