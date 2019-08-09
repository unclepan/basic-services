const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const commentSchema = new Schema({
    __v: {
        type: Number,
        select: false
    },
    content: {
        type: String,
        required: true,
    },
    commentator: { // 评论人
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        select: false
    },
    questionId: {
        type: String,
        required: true,
    },
    answerId: { // 属于那个答案
        type: String,
        required: true,
    },
    rootCommentId: { // 根评论的id，非必选，因为一级评论没有根评论id
        type: String,
    },
    replyTo: { // 回复给谁
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = model('Comment', commentSchema); 
