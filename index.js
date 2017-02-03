/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
    
    by Badruddin Kamal 
*/

var express = require('express');// Enable Express
var app = express();

var fs = require('fs');//Enable Https
var https = require('https');


var cors = require('cors'); // Add CORS for browser requests


var firebase = require('firebase');// Enable Firebase
  firebase.initializeApp({
  serviceAccount: 'Something.json here', // Add Firebase key JSON
  databaseURL: 'Firebase db endpoint here' // Add Firebase endpoint
});


// Add endpoint for CORS
app.use(cors({origin: 'Script origin here'}));


// Create Https Server
https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(8081);



app.post("/YOUR_ENDPOINT_NAME", function (req, res) {
	
firebase.auth().verifyIdToken(req.body.Token).then(function(decodedToken) {
	
  var uid = decodedToken.uid;
  if(uid ===req.body.uid){
   /*
    *
    *
    *
	* Do your work here.
	*
	*
	*
	*
	*/
 
  }else{
	
	// If token UID doesnt Match
	var info={
		message:"Bad Token",
		success:false
		}
    res.json(info);
  }
}).catch(function(error) { // If theres a Token Error
	var info={
		message:(error.code + ' - '+ error.message),
		success:false
		}
	res.json(info);
});
});
