var express = require('express')

var User = require('../models/user')

//MD5 
var md5 = require('blueimp-md5') 

var router = express.Router()

// 首页
router.get('/', function (req, res) {
    //console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

//登录页
router.get('/login', function (req,res) {
    res.render('login.html')
})

router.post('/login', function (req, res, next) {
    //1 获取表单数据
    //2 查询用户名密码是否正确
    //3 发送响应数据
    var body = req.body
    User.findOne(
        {
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    },function (err,user) {
        if (err) {
            return next(err)  
        }

        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或密码不存在'
            })
        } 
        //用户存在登录成功，通过session记录登录状态
        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: 'ok'
        })
    })
    
})

//注册页
router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res, next) {
     //1 获取表单提交到数据 req.body
     //2 操作数据库 判断该用户是否存在
     //3 发送响应
     var body = req.body
     User.findOne(
         {
        email: body.email,
        password: md5(md5(body.password))
     }, 
     function (err, data) {
        if (err) {
          return next(err)
        }
        if (data) {//邮箱或昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或昵称已存在'
            })
        }
        
        //md5 操作
        body.password = md5(md5(body.password))

        new User(body).save(function (err, user) {
            if (err) {
                return next(err) 
            }

            //注册成功，使用session 记录用户的登录状态
            req.session.user = user//user把当前用户之间记录到session中

            return res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })
        
     })
})

router.get('/logout', function (req,res) {
    //退出 清除登录状态，重定向到登录页
    //这里是a链接过来的同步请求,可以使用服务端重定向
    req.session.user = null
    res.redirect('/login')

})


module.exports = router