const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const links = require('./data/links.json');
const async = require('async');

let fullLoad = [];


async.forEachOf(links, (value, key, callback) =>{

	request({url:value.url, jar:true}, (err, res, body)=>{
		if (err) throw err;
		const $ = cheerio.load(body);

		


		$('.list-group-item-heading').each((i, obj)=>{
				const p = $(obj).next('p').text();
				const author = p.split(',')[0].trim();
				const orgFull = p.split(',')[1];
				console.log(orgFull)

				let org;

				try{
					org = orgFull.split('(')[0].trim();
				}

				catch(err){
					org = orgFull;
				}


			// console.log(key, $(obj).sibling('p').text().trim());
				fullLoad.push(({"index":key, "headline":$(obj).text().trim(), "author": author, "org": org}))
				console.log(key)
			
			// catch(err){
			// 	fullLoad.key.i = ({"index":null})
			// }
		
		})

		callback();
	});

}, err =>{
	if (err) throw err;
	fs.writeFileSync('data/moreStories.json', JSON.stringify(fullLoad, null, 3));
});
