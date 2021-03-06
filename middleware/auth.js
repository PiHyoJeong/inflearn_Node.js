 const { User } = require("../models/User"); //user model 불러오기

 let auth = (req,res,next)=>{
     //인증처리

     //Client Cookie 에서 Token을 가져온다.
     let token =req.cookies.x_auth;

     //Token을 복호화한 후 유저를 찾는다.
     User.findByToken(token,(err,user)=>{
         if(err) throw err;
         if(!user) return res.json({isAuth:false,error:true}) //user가 없을 때 

         //user 가 있을 때
         req.token = token; //token과 user를 사용하기 위해 req에 담아두기.
         req.user = user;
         next(); //index.js 에서 middleware(auth)에서 계속 진행할 수 있도록 작성
     })

     //유저가 있으면 인증 OK

     //유저가 없으면 인증 NO
 }