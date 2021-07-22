const route = require("express").Router();

const CommentController = require('../controller/commentController')

route.post('/', CommentController.PostComment);
route.put('/:id', CommentController.UpdateComment);
route.delete('/:id', CommentController.DeleteComment);
route.get('/:id', CommentController.getOneComment);
route.get('/', CommentController.getAllComment);


module.exports = route;