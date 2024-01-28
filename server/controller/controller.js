var Userdb=require('../model/model');

//create new user
exports.create=(req,res)=>{
    //validation of request
    if(!req.body){
        res.status(400).send({message:'content can not be empty'});
        return;
    }
    //instance of new user
    const user=new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    //saving new user in DB
    user
    .save(user)
    .then((data)=>{
        //res.send(data)
        res.redirect('/')
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message || 'error occurred in create operation'
        });
    });

}
//retrieve and return users
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then((data)=>{
            if(!data){
                res.status(404).send({message:`unable to find user`})
            }
            else{
                res.send(data)
            }
        })
        .catch((err)=>{
            res.status(500).send({
                message:err.message || 'error occurred in find operation'
            });
        });
    }
    else{
        Userdb
        .find()
        .then((user)=>{
            res.send(user)
        })
        .catch((err)=>{
            res.status(500).send({
                message:err.message || 'error occurred in find operation'
            });
        });
    }
    
}

//update user
exports.update=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content can not be empty'});
        return;
    }
    //get user by id to update
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then((data)=>{
        if(!data){
            res.status(404).send({message:`can not update user`})
        }
        else{
            res.send(data)
        }
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message || 'error occurred in update operation'
        });
    });
}
//delete users
exports.delete=(req,res)=>{
    //delete with id
    const id=req.params.id;
    Userdb.findByIdAndDelete(id,req.body,{useFindAndModify:false})
    .then((data)=>{
        if(!data){
            res.status(404).send({message:`can not delete user`})
        }
        else{
            res.send('user deleted')
        }
    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message || 'error occurred in delete operation'
        });
    });
}