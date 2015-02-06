var http = require('http');
var port = 8000;


var messages = [];

var onRequest = function(req, res) {
	if (req.method  === 'GET') {
		res.writeHead(200, {
			  'Connection': 'close',
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
			  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  		})
  		res.end(JSON.stringify(messages))
	}
	if (req.method  === 'OPTIONS') {
  		res.writeHead(200, {
			  'Connection': 'close',
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
			  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  		})
  		res.end();
	}

	if (req.method  === 'POST') {
		var postData = '';

		var timeStamp = function() {
		  var now = new Date();
		  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
		  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
		  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
		  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
		  time[0] = time[0] || 12;
		  for ( var i = 1; i < 3; i++ ) {
		    if ( time[i] < 10 ) {
		      time[i] = "0" + time[i];
		    }
		  }
		  return date.join("/") + " " + time.join(":") + " " + suffix;
		}
	

		req.on('data', function(chunk) {
			postData += chunk.toString();
  		});		
		req.on('end', function() {
			var all = {
				message: JSON.parse(postData).message,
				username: JSON.parse(postData).username,
				avatar: JSON.parse(postData).avatar,
				time: timeStamp()
			};
			messages.push(all);

			console.log("Got POST data:");
			console.log(JSON.parse(postData,'{timeStamp()}'));
  		});
  		res.writeHead(200, {
			  'Connection': 'close',
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
			  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  		})
  		res.end(JSON.stringify(postData));
	}
}

http.createServer(onRequest).listen(port);
console.log("listening to port " + port);