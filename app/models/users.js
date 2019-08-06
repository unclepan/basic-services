const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false // mongoose的一个语法，获取的时候不显示
    },
    avatar_url: { 
        type: String 
    },
    gender: {
        type: String,
        enum: ['male', 'female'], //枚举
        default: 'male',
        required: true
    },
    headline: {
        type: String,
    },
    locations: {
        type: [{type: String}], // 字符串数组
        select: false
    },
    business: {
        type: String,
        select: false
    },
    employments: {
        type: [{
            company: {
                type: String
            },
            job: {
                type: String
            }
        }],
        select: false
    },
    educations: {
        type: [{
            school: {
                type: String
            },
            major: {
                type: String
            },
            diploma: {
                type: Number,
                enum: [1, 2, 3, 4, 5]
            },
            entrance_year: {
                type: Number,
            },
            graduation_year: {
                type: Number,
            }
        }],
        select: false
    },
    following: { // 关注者列表，关注了那些人
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        select: false
    }

});

module.exports = model('User', userSchema); 
