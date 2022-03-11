const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
const mongoose = require("mongoose");
const assert = require("assert");
const sendMail = require('../mail.js');
const { $where } = require("../models/userModel");
const { getSystemErrorMap } = require("util");

