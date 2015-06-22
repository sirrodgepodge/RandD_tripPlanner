var express = require('express');
var async = require('async');
var db = require('../models/');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	renderObj = {title: 'Big Trippin'};
	async.each(Object.keys(db),
		function(modelName, done) {
			db[modelName].find(function(err, val){
				if(err) console.log(err);
				renderObj[modelName] = val;
				console.log(modelName, ': ', val);
				done(null);
			});
		},
		function(err) {
			if(err) {
				console.log(err);
				return next(err);
			}
			res.render('index', renderObj);
		}
	);
});

module.exports = router;
