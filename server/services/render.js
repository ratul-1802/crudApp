const axios=require('axios');

exports.homeRoutes=(req,res)=>{//home route
    axios.get('http://localhost:3000/api/users')
    .then((resp)=>{
        console.log(resp);
        res.render('index',{users:resp.data});
    })
    .catch((err)=>{
        res.send(err)
    });

}
exports.add_user=(req,res)=>{//add new user form
    res.render('add_user');
}
exports.update_user=(req,res)=>{//update user form
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}