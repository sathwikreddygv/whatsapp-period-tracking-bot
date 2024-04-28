const Model = require('../models/data');

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
							
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
}

_main().finally(process.exit);