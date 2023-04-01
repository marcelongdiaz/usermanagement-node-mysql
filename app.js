import express from 'express';
import session from 'express-session';
import { getUser, getUsers, createUser, loginCredentials, deleteUser, bulkDeleteUsers, updateUser} from './database.js';

const getNewExpirationTime = () => {
    var hour = 3600000;
    return (new Date(Date.now() + hour));
}

const port = 8080;
const app = express();
app.use(session({ secret: 'keyboard cat',resave:false, cookie: { expires: getNewExpirationTime() }, saveUninitialized: false}))
app.use(express.json());
app.use(express.static("public"));


//session and role checker, only admin can perform edit/delete/add operation
const auth_read = (req, res, next) => {
    
    if(req.session.loggedIn){
        req.session.cookie.expires = getNewExpirationTime();
        next();
    }
    else{
        
        if (process.env.NODE_ENV === 'test') {
            next();
        }
        else{
            res.status(401).send("Unauthorized Access: Failed to complete request due to expired session");
        }
        
    }
}

// admin special access for database 'write' operations (e.g. edit, add, delete) -- I didn't implement this yet due to the missing implementation requirement. 
// var auth_write = (req, res, next) => {
//     if(req.session.loggedIn){
//         if(req.session.role === "admin"){
//             next();
//         }
//         else{
//             res.status(401).send("Unauthorized Access: Your role is not permitted to have a write access");
//         }
//     }
//     else{
//         res.status(401).send("Unauthorized Access: Failed to complete request due to expired session");
//     }
// };

// get all user
app.get("/users", auth_read, async (req,res) => {

    try{
        const users = await getUsers();
        res.send(users);
    }
    catch(error){
        res.status(500).send(error.message)
    }
    
})

//get a user
app.get("/users/:id", auth_read, async (req,res) => {
    
    const { id } = req.params;
    try{
        const user = await getUser(id);
        res.status(200).send(user);
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

//insert a user
app.post("/users", auth_read, async(req, res) => {

    
    const { first_name, last_name, address, post_code, contact_phone, email, username, password } = req.body;
    
    if(!(first_name & last_name & address & post_code & contact_phone & email & username & password)){
        try{
            const user = await createUser(first_name, last_name, address, post_code, contact_phone, email, username, password);
            res.status(201).send(user);
        }catch(err){
            res.status(500).send(err.message)
        }
    }
    else{
        res.status(500).send({message: "Invalid Request"})
    }
    
});

//edit a user
app.post("/users/update", auth_read, async(req,res)=>{

    const { id, data } = req.body;
    const { first_name, last_name, address, post_code, contact_phone, email, username, password } = data;

    if(id !== ""){
        const isUserExist = await getUser(id);
        if(isUserExist){
            try{
                const result = await updateUser(data, id);
                res.status(202).send(result);
            }
            catch(err){
                res.status(500).send(err.message);
            }
        }
        else{
            res.status(500).send({message: "User doesn't exist"});
        }
    }
    else{
        res.status(500).send({message: "Invalid Request"})
    }
})

//delete user
app.delete("/users/delete/:id", auth_read, async(req, res) => {
    
    const { id } = req.params;
    try{
        const result = await deleteUser(id)
        res.status(204).send(result);
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

//delete users
app.delete("/users/deleteusers", auth_read, async(req,res) => {
    
    const { id } = req.body;

    if(id.length > 0){
        try{
            const result = await bulkDeleteUsers(id);
            res.status(204).send(result)
        }catch(err){
            res.status(500).send(err.message);
        }
    }
    else{
        res.status(500).send({message: "Invalid Request"});
    }
    

})

//for login page
app.post("/signin", async(req, res, next)=>{

    const {username , password} = req.body;
    if(!(username || password)){
        res.status(500).send({message: "Invalid Request"});
    }
    else{
        try{
            const result = await loginCredentials(username, password);
            if(result.length > 0){
                req.session.loggedIn = true;
                req.session.role = result[0].role;
                res.status(200).send(result);
            }
            else{
                res.status(200).send(result);
            }
    
        }
        catch(error){
            res.status(500).send(error.message);
        }
    }

});

// for logout
app.get('/logout', (req, res) => {
    req.destroy();
})

// for error catching
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke :(')
})

//initialize
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
}

export default app;