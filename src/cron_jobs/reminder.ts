import mongoose, { connectDB } from "../db";
const Model = require('../models/data');
const whatsAppClient = require("@green-api/whatsapp-api-client");
require('dotenv').config();

const restAPI = whatsAppClient.restAPI({
    idInstance: process.env.ID_INSTANCE || '',
	apiTokenInstance: process.env.API_TOKEN_INSTANCE || ''
});

const _main = async() => {
	try {
		let records = await Model.find()
		if(records && records.length > 0) {
			for(let i = 0; i < records.length; i++){
				let single_record = records[i]
				if(single_record.phone && single_record.date){
					if(new Date() > new Date(single_record.date)){
						const differenceInMilliseconds = new Date().getTime() - new Date(single_record.date).getTime();
						const millisecondsInDay = 1000 * 60 * 60 * 24; 
						const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInDay);
						if(differenceInDays >= 27 && differenceInDays <= 30){
							await restAPI.message.sendMessage(single_record.phone, null, `Hey there! 🌼 Flow Friend is Back with a friendly reminder: Your period is around the corner. It's been ${differenceInDays} days since your last one.\n\nJust reply with "Got my period" to update your date.`)
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
}

connectDB().then(() => {_main().finally(process.exit)})