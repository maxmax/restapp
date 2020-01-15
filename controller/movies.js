const express = require('express');
const router = express.Router();
// const userService = require('../services/user');
const movieModel = require('../model/movies');

router.get('/', getAll);
router.post('/', create);
router.get('/:movieId', getById);
router.put('/:movieId', updateById);
router.delete('/:movieId', deleteById);

module.exports = router;

function getById(req, res, next) {
	console.log(req.body);
	movieModel.findById(req.params.movieId, function(err, movieInfo){
		if (err) {
			next(err);
		} else {
			res.json({status:"success", message: "Movie found!!!", data:{movies: movieInfo}});
		}
	});
}

function getAll(req, res, next) {
	let moviesList = [];

	movieModel.find({}, function(err, movies){
		if (err){
			next(err);
		} else{
			for (let movie of movies) {
				moviesList.push({id: movie._id, name: movie.name, released_on: movie.released_on, author: movie.author});
			}
			res.json({status:"success", message: "Movies list found!!!", data:{movies: moviesList}});

		}

	});
}

function updateById(req, res, next) {
	movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){

		if(err)
			next(err);
		else {
			res.json({status:"success", message: "Movie updated successfully!!!", data:null});
		}
	});
}

function deleteById(req, res, next) {
	movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
		if(err)
			next(err);
		else {
			res.json({status:"success", message: "Movie deleted successfully!!!", data:null});
		}
	});
}

function create(req, res, next) {
	movieModel.create({ name: req.body.name, released_on: req.body.released_on, author: req.body.author }, function (err, result) {
				console.log('create_________________________________', req);
				if (err)
					next(err);
				else
					res.json({status: "success", message: "Movie added successfully!!!", data: null});

			});
}
