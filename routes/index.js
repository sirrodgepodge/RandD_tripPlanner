var express = require('express');
var async = require('async');
var db = require('../models/');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	renderObj = {};
	async.each(Object.keys(db),
		function(modelName, done) {
			db[modelName].find({}, function(err, val){
				if(err) console.log(err);
				renderObj[modelName] = val;
				console.log(modelName, ': ', val);
				done(null);
			});
		},
		function(error) {
			if(error) {
				console.log(error);
				return next(error);
			}
			console.log(renderObj);
			var locals = {};
			// locals.renderObj = renderObj;
			//console.log(locals);
			locals.renderObj = renderObj;
			res.render('index', locals);
		}
	);
});

module.exports = router;