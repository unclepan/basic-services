const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const periodicalPopularSchema = new Schema(
	{
		__v: {
			type: Number,
			select: false
		},
		periodical: {
			type: Schema.Types.ObjectId,
			ref: 'Periodical',
			required: true,
		},
		auditStatus: { // 审核状态
			type: Number,
			select: false,
			default: 0
		}
	},
	{ timestamps: true }
);

module.exports = model('PeriodicalPopular', periodicalPopularSchema);
