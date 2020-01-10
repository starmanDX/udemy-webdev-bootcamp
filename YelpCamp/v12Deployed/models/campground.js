const mongoose          = require('mongoose'),
    comment             = require('./comment'),
    campgroundSchema    = new mongoose.Schema({
        name: String,
        price: String,
        image: String,
        description: String,
        createdAt: {type: Date, default: Date.now},
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    });
    campgroundSchema.pre('remove', async function() {
        await comment.remove({
            _id: {
                $in: this.comments
            }
        });
    });

module.exports = mongoose.model("Campground", campgroundSchema);