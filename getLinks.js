

const fs = require('fs');


let days = {}

for (i = 0; i < 31; i++){
	let index = i + 1;

	if (index < 10){
		index = "0"+index;
	}

	console.log(index)

	const payload = `https://www.vpap.org/vanews/past/?edition__date=2011-08-${index}`

	days[index] = ({"url":payload});

	fs.writeFileSync('data/links.json',JSON.stringify(Object.values(days), null, 3))
}