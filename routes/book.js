const router = require("express").Router();
const User=require("../models/user")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {authenticateToken}=require("./userAuth")