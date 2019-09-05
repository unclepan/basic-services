
// JS-SDK要使用的
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TicketSchema = new Schema({
	name: String, // ticket
	ticket: String,
	expires_in: Number,
}, { timestamps: true });

TicketSchema.statics = {
	async getTicket() {
		const ticket = await this.findOne({
			name: 'ticket'
		});
		if (ticket && ticket.ticket) {
			// ticket.ticket = ticket.ticket;
		}
		return ticket;
	},

	async saveTicket(data) {
		let ticket = await this.findOne({
			name: 'ticket'
		});

		if (ticket) {
			ticket.ticket = data.ticket;
			ticket.expires_in = data.expires_in;
		} else {
			ticket = new Ticket({
				name: 'ticket',
				ticket: data.ticket,
				expires_in: data.expires_in
			});
		}

		await ticket.save();

		return data;
	}
};

const Ticket = model('Ticket', TicketSchema);
module.exports = Ticket;
