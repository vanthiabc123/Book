const Post = require('../models/posts');
const User = require('../models/user');
const moment = require('moment');
const Comment = require('../models/comments');
const sanitizeHtml = require('sanitize-html');

const showPage = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'categoryId',
    select: 'name',
  });
  const user = req.session.user;
  const comments = await Comment.find({ postId: post._id }).populate('userId');
  res.render('postDetails', {
    title: 'Post Details',
    post,
    moment,
    comments,
    user,
    sanitizeHtml,
  });
};
const addComments = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    // ajax request to add comments
    console.log(req.body);
    const comment = new Comment({
      userId: req.session.user._id,
      postId: post._id,
      content: req.body.content,
    });
    console.log(req.session.user);
    //  data của thag này tui chưa có ảnh nên chưa có ảnh trả về
    //     _id: '640d7cbb5b390df50f36bb47',
    // username: 'tuan123',
    // password: '$2a$10$LZ2hbjM1wlGweB6aknaQ5.thAoioICqIVxjGI.m8yR7yLIGqYP.iS',
    // email: 'tuan2002@gmail.com',
    // birthday: '2023-03-16T00:00:00.000Z',
    // gender: '1',
    // createAt: '2023-03-12T07:18:19.818Z',
    // __v: 0
    //
    await comment.save();
    console.log('dc r ');
    res.status(200).json({
      comment: req.body.content,
      username: req.session.user.username,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/postDetails/${req.params.id}`);
  }
};
const deleteComments = async (req, res) => {
  // check if the user is the owner of the comment
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId == req.session.user._id) {
      await Comment.findByIdAndDelete(req.params.commentId);
      res.redirect(`/postDetails/${req.params.id}`);
    } else {
      res.redirect(`/postDetails/${req.params.id}`);
    }
  } catch (error) {
    res.redirect(`/postDetails/${req.params.id}`);
  }
};

module.exports = {
  showPage,
  addComments,
  deleteComments,
};
