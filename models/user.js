var mongoose = require('mongoose')

//链接数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

var Schema = mongoose.Schema

var userSchema = new Schema({
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

})

module.exports = mongoose.model('User', userSchema)
// 约定：最终会变成 小写复数-users

