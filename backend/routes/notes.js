const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes=require("../model/Notes")
const { body, validationResult } = require('express-validator');
const router=express.Router();


// fetch all users notes using = GET "api/auth/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{
        const userId=req.user.id;
        const notes=await Notes.find({user:userId});
        res.json(notes);
    }catch(e){
        console.log(e.message);
        return res.status(500).send("Internal error")
    }
})

// Add news notes using = Post "api/auth/addnotes"
router.post('/addnotes',fetchuser,[
        body('title','Enter valid title').notEmpty(),
        body('description','Description must contains 5 characters').isLength({min:5}),
],async(req,res)=>{
     //if any error occuring
     const result = validationResult(req);
     if (!result.isEmpty()) {
         return res.send({ errors: result.array() });
     }
    try{
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save();
        return res.status(200).json({
            success:true,
            data:savedNote
        })
        
    }catch(e){
        console.log(e.message);
        return res.status(500).send("Internal error")
    }
});


// Add news notes using = PUT "api/auth/addnotes"
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        // find note to be update
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("Not Found");}

        //validating authorize user 
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

        res.send({note});
    }catch(e){
        console.log(e.message);
        return res.status(500).send("Internal error")
    }
});

// Add news notes using = DELETE "api/auth/deletenotes/:id"
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    try{
        // find note to be deleted and delete it
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(401).send("Not Found");}

        //validating authorize user 
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}

        note = await Notes.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Note deleted successfully"
        })
    }catch(e){
        console.log(e.message);
        return res.status(500).send("Internal error")
    }
});


module.exports=router