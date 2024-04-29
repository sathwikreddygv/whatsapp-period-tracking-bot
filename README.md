# Flow Friend🩸✨, a Period Tracking Whatsapp Bot
This repository contains the source code for a WhatsApp bot designed to help users track their menstrual cycles. The bot provides features such as period tracking, reminders, and insights into menstrual health.

## Table of Contents
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Contributing](#contributing)

### Features
* **Set Date**: Allows users to set their menstrual cycle start date.
* **Period Tracking**: Users can always know their last set date by just pinging "Hi".
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
  ID_INSTANCE=""
  API_TOKEN_INSTANCE=""
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
```
crontab -e 
```
```
30 5 * * * /home/ubuntu/script.sh > output.txt
```

### Usage 
* Ping "Hi" to the Whatsapp number used in Green Api account from a different Whatsapp account
* You should be able to see replies from the bot
* Set your period Date (Custom date is also supported)
* Ping "Hi" anytime to know your last period date
* If your cron is running, you will receive reminders everyday starting from 26 days after your last period date

### Contributing
Contributions to the WhatsApp Period Tracking Bot are welcome! To contribute:
* Fork the repository.
* Create a new branch (git checkout -b feature-branch).
* Make your changes.
* Commit your changes (git commit -am 'Add new feature').
* Push to the branch (git push origin feature-branch).
* Create a new Pull Request.

