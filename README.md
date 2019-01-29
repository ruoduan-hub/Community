## 引言

个人兴趣使然 无任何商业用途

![logo](https://github.com/Chad97/Community/blob/master/public/img/logo3.png)

###  技术栈

- art-template 模板引擎
- blueimp-md5 加密敏感信息
- bootstrap 样式框架
- express 中间件框架
- express-art-template 服务端操作 art-template 轮子
- express-session 中间件 session 保持登录状态
- jquery@3.3.1 不解释了
- mongoose  nodejs操作mongoDB的轮子



```js
+-- art-template@4.13.2
+-- blueimp-md5@2.10.0
+-- body-parser@1.18.3
+-- bootstrap@3.3.7
+-- express@4.16.4
+-- express-art-template@1.0.1
+-- express-session@1.15.6
+-- jquery@3.3.1
`-- mongoose@5.4.5
```



#### 数据库 mongoDB

- 工具 ：NoSQLBooster for MongoDB 
  + mongooDB的可视化工具，没什么卵用基本是命令行操作
- mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

## 路由



| 路径      | 方法 | get参数 | post参数              | 是否需要登录验证 | 备注         |
| --------- | ---- | ------- | --------------------- | ---------------- | ------------ |
| /         | GET  |         |                       |                  | 渲染首页     |
| /register | GET  |         |                       |                  | 渲染注册页   |
| /register | POST |         | email，name，password |                  | 处理注册请求 |
| /login    | GET  |         |                       |                  | 渲染登录页面 |
| /login    | POST |         | email,password        |                  | 处理登录请求 |
| /logout   | GET  |         |                       |                  | 处理退出请求 |



### 目录结构

```js
├─models //数据库模型
├─node_modules 
├─public 
│  ├─css
│  ├─img
│  └─js
├─routes //路由
└─views //组件
    ├─settings
    ├─topic
    ├─_layouts
    └─_partials

```





## user_Table

- **register**

  + err_code
  + type:post
  + url:register

  | 0    | 1              | 2              |
  | ---- | :------------- | -------------- |
  | 正常 | 邮箱or昵称重复 | 服务器内部错误 |

  



-  **userSchema**

```js
{
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now
        //注意 Date.now() 会即刻调用,导致返回值一致
        //new model的时候，如果没传递create_time，会把default的返回值自动接收
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: '这个人很神秘，什么也没留下'
    },
    gender: {
        type: Number,
        enum: [-1,0,1],
        default: -1
    },
    birthday: {
        type: Date,
    },
    status: {
        type: Number,
        //是否可以评论，是否可以登录
        //0 没有权限限制
        //1 不可以评论
        //2 不可以登录
        enum: [1,2],
        default: 0
    }

}
```



### 调试：

- 入口文件：app.js
- 需要nodejs 环境 and mongoDB 
  + 数据库表 users

```shell
> mongod #启动数据库
> node app.js or > nodemon app.js #挂载服务
# 127.0.0.1:3000
```



