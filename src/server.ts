import express, { Express, Request, Response } from 'express';
import mongoose, { connectDB } from './db';
import WhatsAppBot from '@green-api/whatsapp-bot'
import { session, Stage, BaseScene as Scene, GreenApiV1 } from '@green-api/whatsapp-bot'
require('dotenv').config();
const Model = require('./models/data');


const bot = new WhatsAppBot({
	idInstance: process.env.ID_INSTANCE || '',
	apiTokenInstance: process.env.API_TOKEN_INSTANCE || ''
})

const comforting_messages_array = [`Meanwhile, remember to prioritize your comfort and well-being during this time. Whether it's taking things slow, getting some extra rest, or finding ways to relieve any discomfort.`,
	`I know it's definitely not the most pleasant experience. Take this time to pamper yourself a bit, maybe indulge in some self-care rituals or activities that help you feel better.`,
	`I know it's not easy dealing with all the discomfort and mood swings that come with it. Take as much time as you need to rest and take care of yourself.`,
]

function isValidDateFormat(dateString: string) {
	// Regular expression for YYYY-MM-DD format
	const regex = /^\d{4}-\d{2}-\d{2}$/;
	return regex.test(dateString);
}

bot.use(session())

bot.on('message', async (ctx) => {
	let text_message = ctx.message?.text?.toLocaleLowerCase().trim()
	console.log(text_message, ctx.message?.chat.id);

	let existing_data = await Model.find({ phone: ctx.message?.chat.id })
	console.log(existing_data)

	if (text_message?.includes('got my period')) { 
		ctx.reply(`Hey, I hope you're doing okay 🌟. I noticed you mentioned your period – when did you start feeling it`, { reply_markup: { keyboard: [['1 - Reply "Today"', '2 - Reply "Yesterday"', '3 - Enter a date (YYYY-MM-DD)']] as any } })
	} else if (text_message?.includes('today') || text_message?.includes('yesterday') || isValidDateFormat(text_message ? text_message : '')) {
		let period_date = new Date()
		if (text_message?.includes('yesterday')) period_date.setDate(period_date.getDate() - 1)
		if (isValidDateFormat(text_message ? text_message : '')) {
			period_date = new Date(text_message as any)
		}

		if (existing_data && existing_data.length) {
			await Model.updateOne({ phone: ctx.message?.chat.id }, { date: new Date(period_date) })
			console.log('record updated')
		} else {
			const data = new Model({
				phone: ctx.message?.chat.id,
				date: new Date(period_date)
			})

			try {
				const dataToSave = await data.save();
				console.log('new record created')
			}
			catch (error) {
				console.error(error)
			}
		}

		ctx.reply(`Got it! I'll set a reminder ⏰  to check in with you next month. \n\n${comforting_messages_array[Number((Math.random() * 1000).toFixed(0)) % 3]} \n\nJust say "Hi" to track your date! I'm here whenever you need.`)
	} else {
		if (existing_data && existing_data.length) {
			ctx.reply(`Hey there, good to see you again! 😊 Guess what? I've got your back on the period front! Your last period started on ${new Date(existing_data[0].date).toDateString().substring(4, 15)}.\n\nWant to update your period date? Just reply with "Got my period"!`)
		} else {
			ctx.replyWithMarkdown("Hi there! I'm Flow Friend😃, your reliable period tracking bot `(created by Gv)`. I'm here to help you stay on top of your menstrual cycle with ease and convenience. Whether you're looking to track your cycle, or simply need a friendly reminder, I've got you covered. Let's work together to make managing your period a breeze!\n\nWhen you're ready to get started, simply reply with `Got my period` to set your date.")
		}
	}
})

connectDB().then(() => {bot.launch()})