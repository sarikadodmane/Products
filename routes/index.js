"use strict"

const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth')

router.post('/', controller.signup)

router.post('/user', controller.signin)

router.get('/', controller.getuser)

router.put('/:name', controller.updateuser)

router.get('/delete/:id', controller.deleteuser)

module.exports = router
