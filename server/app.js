const express = require('express');
const app  = express();
const request = require('request');
const riot = require('../riot_api_key');
var testData = {first: "anthony", last: "clausing", age:23}

let championListURL = `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&tags=tags&api_key=${riot.key}`
app.get('/api/champList', function(req,res){ 
 request(championListURL, function(err,response,body){
   if(!err){
     var json = JSON.parse(response.body);
     res.send(json);
   }
   else{
     console.log(err);
   }
 })
})
app.listen(3000, function(){
  console.log('Youre listening on port 3000!')
})