/*
	A package and a chrome extension that allows you to get a quick summary of a articlr,
	and get the time it would take to read through the article
*/

//npms 
var summarizer   = require('node-summarizer').SummarizerManager,
    cheerio      = require('cheerio'),
    rp           = require('request-promise');


// Class
class read{
	constructor(article){
		this.article = article
		
	}
	
	// Summarize the article using node-summarizer npm

	summarize(number_of_sentences){
		var options = {
		    uri: this.article,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
		};
		 
		rp(options)
		    .then(function ($) {

		    	// This checks what the most used HTML tag is used on the webpage

		    	var arr = [
		    		[$('p').text().split(' ').length],
		    		[$('h1').text().split(' ').length],
		    		[$('h2').text().split(' ').length],
		    		[$('h3').text().split(' ').length],
		    		[$('h4').text().split(' ').length],
		    		[$('h5').text().split(' ').length],
		    		[$('h6').text().split(' ').length]
		    	]

		    	var x = arr[0][0];

		    	for(var i = 0; i < arr.length; i++){
		    		if(arr[i][0] >= x){
		    			var x = arr[i][0]
		    		}
		    		else{
		    			continue
		    		}
		    	};

				let Summarizer = new summarizer(x, number_of_sentences); 

				let summary = Summarizer.getSummaryByRank().then((summary_object)=>{
					summary.then(summary_object.summary);
				});
				

		    })
		    .catch(function (err) {
		        console.log(err);
		   	});
	}

	// Get time average person takes to read the article

	timeToRead(){
		const self = this
		var options = {
		    uri: this.article,
		    transform: function (body) {
		        return cheerio.load(body);
		    }
		};
		 
		rp(options)
		    .then(function ($) {

		    	// This checks which tag appears the most to check which is the main tag used for the article

		    	var arr = [
		    		[$('p').text().split(' ').length],
		    		[$('h1').text().split(' ').length],
		    		[$('h2').text().split(' ').length],
		    		[$('h3').text().split(' ').length],
		    		[$('h4').text().split(' ').length],
		    		[$('h5').text().split(' ').length],
		    		[$('h6').text().split(' ').length]
		    	]

		    	var x = arr[0][0];

		    	for(var i = 0; i < arr.length; i++){
		    		if(arr[i][0] >= x){
		    			var x = arr[i][0]
		    		}
		    		else{
		    			continue
		    		}
		    	};
				
		    	if(Math.round(x/222) == 0){	
		    		x = $('div').text().split(' ').length
		    		console.log('This time might not be accurate, because the page does no use traditional HTML text Tags')
		    	}

				// Math to find the time to read the article
				var time = Math.round(x/222)
				console.log(time + " minute read")

			})

		    .catch(function (err) {
		        console.log(err);
		   	});
	}


}

module.exports.read = read;


