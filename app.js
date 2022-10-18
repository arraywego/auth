const express = require('express');

const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET, 
    idpLogout: true,  
  })
);
app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/user.html");
    /*res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')*/
})
app.get('/profile', requiresAuth(),(req,res) => {
    res.json(req.oidc.user);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
