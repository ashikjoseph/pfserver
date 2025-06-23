// path to resolve each client request
const userController= require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const profileController = require('../Controllers/profileController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// 1) import express

const express = require("express");

// 2) create an object for the class Router in Express
const router = new express.Router();

// 3) define path
//syntax
// router.http-request-method("path to resolve", ()=>{
    // how to resolve the request (controller function)
// })

// 1) user registration
router.post('/user/register', userController.register)

// 2) user login
router.post('/user/login',userController.login)

// 3) add new project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// 4)get project for home page
router.get('/project/home-project',projectController.getHomeProject)

// 5) get all projects
router.get('/project/all-project',jwtMiddleware,projectController.getAllProject)

// 6)get user projects
router.get('/project/user-project',jwtMiddleware,projectController.getUserProject)

// 7) edit user project
router.put('/project/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editUserProject)

// 8)delete user project
router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteUserProject)

// 9) Add profile
router.post('/profile/add', jwtMiddleware, multerConfig.single('profileImage'), profileController.addProfile);

// 10) Get user profile
router.get('/user-profile', jwtMiddleware, profileController.getUserProfile);

// 11) Edit user profile
router.put('/edit-profile/:id', jwtMiddleware, multerConfig.single('profileImage'), profileController.editUserProfile);



// 4) export router
module.exports = router;
