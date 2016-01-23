var geocode = require('./node_modules/google-geocoding');
var parser = require('./node_modules/json-parse');

// return ex : { lat: 48.8330131, lng: 2.2981687 }
function GeocodeData(data){
    return data.map(function (element){
	    return geocode.geocode(element.street + ', ' + element.postcode + ' ' + element.city, function(err, location){
		    if (err) {
			console.log('Error:' + err);
		    }
		    else if (!location) {
			console.log('No result.');
		    }
		    else {
			return location;
		    }
		});
	    });
}

function GeocodeElement(element){
    return geocode.geocode(element.street, + ', ' + element.postcode + ' ' + element.city, function(err, location) {
	    if (err) {
		console.log('Error:' + err);
	    }
	    else if (!location){
		console.log('No result.');
	    }
	    else {
		return location;
	    }
	});
}

/*
var myjson = '[{"number":"1","street":"Rue Saint-Laurent","city":"Paris 10e Arrondissement","postcode":"75010","firstname":"Aaron","lastname":"Desamparo"},{"number":"123","street":"Rue Du Faubourg Saint-Martin","city":"Paris 10e Arrondissement","postcode":"75010","firstname":"Abbey","lastname":"Desan"},{"number":"72","street":"Rue De Dantzig","city":"Paris 15e Arrondissement","postcode":"75015","firstname":"Abbie","lastname":"Aaby"}]';

var mydata = parser([])(myjson);
//Promise.resolve(myjson).then(parse([])).

Promise.all(GeocodeData(mydata)).then(function(){
	//	console.log(args);
    });

console.log(GeocodeData(mydata));
*/