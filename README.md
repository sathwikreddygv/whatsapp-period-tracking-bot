# Flow Friend🩸✨, a Period Tracking Whatsapp Bot
This repository contains the source code for a WhatsApp bot designed to help users track their menstrual cycles. The bot provides features such as period tracking and reminders.

## Table of Contents
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Contributing](#contributing)

### Features
* **Set/Modify Date**: Enables users to set or modify their menstrual cycle's start date.
* **Period Tracking**: Users can easily retrieve their most recent set date by simply sending a "Hi" message.
* **Reminders**: Sends reminders to users before their next period is expected.

### Setup
To set up the WhatsApp Period Tracking Bot, follow these steps:
1. Clone the repository:  
```
  git clone https://github.com/sathwikreddygv/whatsapp-period-tracking-bot.git
```
2. Create Green Api Account and setup a developer instance for Whatsapp APIs
* Visit <a href="https://console.green-api.com" target="_blank">Green Api Console</a>
* Copy ID_INSTANCE and API_TOKEN_INSTANCE from <a href="https://console.green-api.com/instanceList" target="_blank">Green Api Instances</a>

3. Configure environment variables:
* Create a .env file in the root directory.
* Add the following variables:
```
  ID_INSTANCE=<YOUR_ID_INSTANCE>
  API_TOKEN_INSTANCE=<YOUR_API_TOKEN_INSTANCE>
  MONGODB_URL="mongodb://localhost:27017"
```
4. Run Docker Compose:
```
  docker compose up
```
Now you should see 2 docker container running (one for the Node app and the other for Mongodb)  
    
5. Setup cron job for reminders  
Create a ```script.sh``` file in root with the following commands inside the file
```
tsc
node dist/cron_jobs/reminder.js
```
Run the following command
```
crontab -e 
```
Set the cron to run at 5.30am every morning
```
30 5 * * * /home/ubuntu/script.sh > output.txt
```

### Usage 
* Ping "Hi" to the Whatsapp number used in Green Api account from a different Whatsapp account
* You should be able to see replies from the bot
* Set your period Date (Custom date is also supported)
* Ping "Hi" anytime to know your last period date
* If your cron is running, you will receive reminders everyday starting from 26 days after your last period date (you can update the date meanwhile)

### Contributing
Contributions to the WhatsApp Period Tracking Bot are welcome! To contribute:
* Feel free to raise issues/pull requests

