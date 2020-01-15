const express = require('express');
const router = express.Router();
// const userService = require('../services/user');
const taxonomyModel = require('../model/taxonomy');

router.get('/', getAll);
router.post('/', create);
router.get('/:taxonomyId', getById);
router.put('/:taxonomyId', updateById);
router.delete('/:taxonomyId', deleteById);

module.exports = router;

function getById(req, res, next) {
	console.log(req.body);
	taxonomyModel.findById(req.params.taxonomyId, function(err, taxonomyInfo){
		if (err) {
			next(err);
		} else {
			res.json({status:"success", message: "taxonomy found!!!", data:{taxonomy: taxonomyInfo}});
		}
	});
}

function getAll(req, res, next) {
	let taxonomyList = [];

	taxonomyModel.find({}, function(err, taxonomy){
		if (err){
			next(err);
		} else{
			for (let tax of taxonomy) {
				taxonomyList.push({id: tax._id, name: tax.name, author: tax.author});
			}
			res.json({status:"success", message: "taxonomy list found!!!", data:{taxonomy: taxonomyList}});

		}

	});
}

function updateById(req, res, next) {
	taxonomyModel.findByIdAndUpdate(req.params.taxonomyId,{name:req.body.name}, function(err, taxonomyInfo){

		if(err)
			next(err);
		else {
			res.json({status:"success", message: "taxonomy updated successfully!!!", data:null});
		}
	});
}

function deleteById(req, res, next) {
	taxonomyModel.findByIdAndRemove(req.params.taxonomyId, function(err, taxonomyInfo){
		if(err)
			next(err);
		else {
			res.json({status:"success", message: "taxonomy deleted successfully!!!", data:null});
		}
	});
}

function create(req, res, next) {
	taxonomyModel.create({ name: req.body.name, author: req.body.author }, function (err, result) {
				console.log('create_________________________________', req);
				if (err)
					next(err);
				else
					res.json({status: "success", message: "taxonomy added successfully!!!", data: null});

			});
}
