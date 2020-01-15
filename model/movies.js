const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	released_on: {
		type: Date,
		trim: true,
		required: true
	},
	author: {
		type: String,
		trim: true,
		required: true,
	}
});

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Movie', schema)
