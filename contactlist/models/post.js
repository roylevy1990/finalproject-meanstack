const mongoose = require('mongoose');
const fs = require('fs');
const User = require('../models/user')
const PostSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        // index: { unique: true, dropDups: true }
    },
    // array of usernames
    likes: [String],
    userImg: {
        type: String
    },

});
const Post = module.exports = mongoose.model('Post', PostSchema);


module.exports.addPost = (post, callback) => {
    post.save(callback);
};

module.exports.likePost = (postID, username, callback) => {
    // check if user liked already()

    var update = { $addToSet: { 'likes': username } };
    Post.findByIdAndUpdate(postID, update, { new: true, upsert: true }, callback)
}
module.exports.getAllFriendsPosts = (user, callback) => {
    Post.find({ author: user.friends_list }, callback)

}