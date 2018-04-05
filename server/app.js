const express = require('express');
const app  = express();

const riot = require('../riot_api_key');
var testData = {first: "anthony", last: "clausing", age:23}

app.get('/api/champList', function(req,res){
  app.get(`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&tags=tags&api_key=${riot.key}`,
(req, res) => { res.json(res.data)})
})
app.listen(3000, function(){
  console.log('Youre listening on port 3000!')
})