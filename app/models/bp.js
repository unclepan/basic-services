const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bpSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		bp: {
			type: Array,
			required: true
		},
	},
	{ timestamps: true }
);

module.exports = model('BP', bpSchema);
