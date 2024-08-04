const Blogs = require('../schemas/blogs.schema');
const Users = require('../schemas/user.schema');
const cloudinary = require('cloudinary').v2

let service = {};
service.createBlogs = createBlogs;
service.getBlogs = getBlogs;
service.deleteBlogs = deleteBlogs;
service.editBlogs = editBlogs;
service.likes = likes;
service.disLikes = disLikes;
service.commentBlog = commentBlog;
service.getBlogsById = getBlogsById;
async function createBlogs(body, files) {
    try {
        let imageUrls = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const cloudData = await cloudinary.uploader.upload(file.path);
                imageUrls.push(cloudData.secure_url);
            }
        }
        if (imageUrls.length > 0) {
            body.images = imageUrls;
        }
        const newBlog = new Blogs(body)
        const savedBlog = await newBlog.save()
        return savedBlog
    } catch (error) {
        return Promise.reject({ error: 'Unable to post Blogs. Try again later!' });
    }
}
async function getBlogs() {
    try {
        const blogs = await Blogs.find().populate('category', 'categoryTitle');
        return blogs;
    } catch (err) {
        console.log("Error getting blogs:", err.message);
        throw new Error("Error getting blogs: " + err.message);
    }
}
async function getBlogsById(id) {
    try {
        const blog = await Blogs.findById(id).populate('category', 'categoryTitle');
        if (!blog) {
            throw new Error('Blog not found');
        }
        return blog;
    } catch (err) {
        console.error("Error getting blog by ID:", err.message);
        throw new Error("Error getting blog by ID: " + err.message);
    }
}
  
async function deleteBlogs(id) {
    try {
        const blogs = await Blogs.findByIdAndDelete(id);
        return blogs;
    }
    catch (err) {
        console.log("Error deleting blogs");
        throw new Error("Error deleting blogs", err);
    }
}

async function editBlogs(id, body, file) {
    try {
        if (file) {
            const cloudData = await cloudinary.uploader.upload(file.path);
            const imageUrl = cloudData.secure_url;
            body.image = imageUrl;
        }
        const updatedBlog = await Blogs.findByIdAndUpdate(id, body, { new: true });
        return updatedBlog;
    } catch (err) {
        console.error("Error editing blogs:", err);
        throw new Error("Error editing blogs");
    }
}
async function likes(postId, userId) {
    try {
        // checking id's validity in the database
        const postExist = await Blogs.findById(postId);
        const userExist = await Users.findById(userId);

        if (!postExist) {
            throw new Error("Post not found");
        }
        if (!userExist) {
            throw new Error("User not found");
        }

        // checking if user already liked the post in the past
        if (postExist.likedBy.includes(userId)) {
            throw new Error("Post already liked");
        }

        // checking if user already disliked then remove dislike
        if (postExist.dislikedBy.includes(userId)) {
            postExist.dislikedBy.pull(userId);
            postExist.dislikes -= 1;
        }

        // creating like and storing into the database
        postExist.likedBy.push(userId);
        postExist.likes += 1;

        const savedLikes = await postExist.save();
        return savedLikes;
    } catch (error) {
        console.error("Error liking post", error);
        throw new Error(error.message);
    }
}

async function disLikes(postId, userId) {
    try {
        // checking id's validity in the database
        const postExist = await Blogs.findById(postId);
        const userExist = await Users.findById(userId);

        if (!postExist) {
            throw new Error("Post not found");
        }
        if (!userExist) {
            throw new Error("User not found");
        }

        // checking if user already liked the post in the past
        if (postExist.dislikedBy.includes(userId)) {
            throw new Error("Post already disliked");
        }

        // checking if user already disliked then remove dislike
        if (postExist.likedBy.includes(userId)) {
            postExist.likedBy.pull(userId);
            postExist.likes -= 1;
        }

        // creating like and storing into the database
        postExist.dislikedBy.push(userId);
        postExist.dislikes += 1;

        const savedLikes = await postExist.save();
        return savedLikes;
    } catch (error) {
        console.error("Error liking post", error);
        throw new Error(error.message);
    }
}

async function commentBlog(postId, userId,comments){
    try {
        const postExist = await Blogs.findById(postId);
        const userExist = await Users.findById(userId);

        if (!postExist) {
            throw new Error("Post not found");
        }
        if (!userExist) {
            throw new Error("User not found");
        }
        postExist.commentBy.push(userId);
        postExist.comments.push(comments);
        const savedComments = await postExist.save();
        return savedComments;
    }
    catch(err){
        console.error("Error creating comments", err);
        throw new Error(err.message);
    }
}

module.exports = service;

