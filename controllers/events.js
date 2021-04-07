const {response, json} = require('express');
const Event = require('../models/Event')

const getEvent =  async(req,res) => {

    const events = await Event.find()
                            .populate('user','name');
 
     res.status(200).json({
        ok:true,
        msg: events
    });
}

const createEvent = async (req,res) => {
   
    const newEvent = new Event(req.body);

    try {

    newEvent.user = req.body.uid;   
    console.log(newEvent.user);
    const savedEvent = await newEvent.save(); 
   
    res.json({
        ok:true,
        event:savedEvent
    });

    } catch (error) {     
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Talk With Admin"
        })
    }
}

const updateEvent = async(req,resp = response) => {

    const eventID = req.params.id;
    const uid = req.body.uid;

    try {
        const event = await Event.findById(eventID);
       
        if(!event){
            resp.status(404).json({
                ok:false,
                msg: "event not found with this id"
            });
        }
        console.log(event.user);
        if(event.user.toString() !== uid)
        {
           return resp.status(401).json({
               ok:false,
               msg: 'you dont that privilege to edit this event'
           })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }
        const updatedEvent = await Event.findByIdAndUpdate(eventID,newEvent,{new:true});

       return resp.json({
            ok:true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'Talk with system administrator'
        })
    } 
}

const deleteEvent = async (req,resp = response) => {

    const eventID = req.params.id;
    const userUid = req.body.uid;
    
    try {
        const event = await Event.findById(eventID.toString());
        console.log(eventID.toString());
        if(!event){
            resp.status(404).json({
                ok:false,
                msg: "event not found with this id"
            });
        }
        
        if(event.user.toString() !== userUid)
        {
           return resp.status(401).json({
               ok:false,
               msg: 'you dont that privilege to edit this event'
           })
        }

        await Event.findByIdAndDelete(eventID)
        resp.json({ok: true,msg:"deleted"});

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}



