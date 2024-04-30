import mongoose from "mongoose";
import { connectDB } from "../db";
import Model from '../models/data';
import whatsAppClient from "@green-api/whatsapp-api-client";
import dotenv from 'dotenv';

dotenv.config();

const restAPI = whatsAppClient.restAPI({
    idInstance: process.env.ID_INSTANCE || '',
    apiTokenInstance: process.env.API_TOKEN_INSTANCE || ''
});

async function processRecords() {
    try {
        const currentDate = new Date();
        const records = await Model.find({ 
            phone: { $exists: true }, 
            date: { $lte: currentDate } 
        });

        const messagesToSend = records.filter(record => {
            const differenceInDays = Math.floor((currentDate - record.date) / (1000 * 60 * 60 * 24));
            return differenceInDays >= 27 && differenceInDays <= 30;
        });

        await Promise.all(messagesToSend.map(async record => {
            const differenceInDays = Math.floor((currentDate - record.date) / (1000 * 60 * 60 * 24));
            await restAPI.message.sendMessage(record.phone, null, `Hey there! 🌼 Flow Friend is Back with a friendly reminder: Your period is around the corner. It's been ${differenceInDays} days since your last one.\n\nJust reply with "Got my period" to update your date.`);
        }));
    } catch (err) {
        console.error(err);
    }
}

connectDB()
    .then(processRecords)
    .finally(() => process.exit());
