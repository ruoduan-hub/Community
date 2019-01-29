//引包
var express = require('express')
var app = express()
var path = require('path')

var router = require('./routes/router')
var bodyParser = require('body-parser')

var session = require('express-session')//session 引包

//开放文件夹
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
//path.join 推荐方法，直接写路径，join，帮你破解转换路径
// path.parse 分割路径 转化成对象
//path.isAbsolute(path) 判断是不是绝对路径

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('html', require('express-art-template')) //express-art-template 引包
app.set('views', path.join(__dirname, './views/')) //默认就是views 目录，这里写方便改

// 配置session 
app.use(session({
    secret: 'my key',//配置加密字符串,他会在原有加密基础上凭据上自己定义的字符串加密信息，防止客户端恶意伪造
    resave: false,
    saveUninitialized: true//强制将为初始化的session 储存，无论是否使用session 都默认分配一个秘钥
  }))


//挂载路由
app.use(router)

//启动服务
app.listen(3000 ,function () {
    console.log('running 3000 ...')
})