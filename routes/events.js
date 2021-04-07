const { Router } = require("express");
const { validateJWT } = require('../middlewares/jwt-validate');
const { check } = require("express-validator");
const {validateField}= require('../middlewares/field-validator');
const { isDate } = require("../helpers/isDate");
const { createEvent, updateEvent, getEvent, deleteEvent } = require("../controllers/events");

const router =  Router();

//All have to pass the JWT validation token
router.use(validateJWT);

//TODO: pass the getEvent method
router.get('/',getEvent);

//TODO: create new event createEvent.
router.post('',
[
    check("title","title is required").not().isEmpty(),
    check("start","start date is required").custom(isDate),
    check("end","end date is required").custom(isDate),

    validateField
]
,createEvent);

//TODO: Update event.
router.put('/:id',updateEvent);

//TODO: delete event.
router.delete('/:id',deleteEvent);

module.exports = router


