const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const links = require('./data/links.json');
const async = require('async');

let fullLoad = {};

async.forEachOf(links, (value, key, callback) =>{
	request({url:value.url, jar:true}, (err, res, body)=>{
		if (err) throw err;
		const $ = cheerio.load(body);
		const hed = $('meta[property="og:title"]').attr('content');
		const blurb = $('meta[property="og:description"]').attr('content');
		const link = links[key].url;
		const image = $('meta[property="og:image"]').attr('content');
		const payload = ({"order":key+1, "hed":hed, "blurb":blurb, "url":link, "image":image});
		
		fullLoad[key] = (payload);
		console.log(`Pulling: ${hed}`);
		callback();
	});
}, err =>{
	if (err) throw err;
	fs.writeFileSync('data/moreStories.json', JSON.stringify(Object.values(fullLoad), null, 3));
});
