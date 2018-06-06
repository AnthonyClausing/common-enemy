const express = require('express');
const app  = express();
const request = require('request');
const riot = require('../riot_api_key');
function riotURLCreator(type, key, params){
    switch(type){
    case 'champions':
      return `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&tags=tags&api_key=${key}`;
    case 'summoner':
      return `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${params.name}?api_key=${key}`;
    case 'matches':
      return  `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${params.accID}?endIndex=10&api_key=${key}`;
    case 'match':
      return `https://na1.api.riotgames.com/lol/match/v3/matches/${params.gameId}?api_key=${key}`
    }
}
app.get('/api/champions', function(req,res){ 
 request(riotURLCreator('champions', riot.key), (err,response,body) =>{
   !err ?  res.send(JSON.parse(response.body)) : console.log(err);
  })
})

app.get('/api/summoner',function(req,res){
  let name = req.query.name;
  request(riotURLCreator('summoner',riot.key,{name}), (err,response,body) => {
    !err ? res.send(JSON.parse(response.body)) : console.log(err);
  })
})

app.get('/api/matches', function(req, res){
  let accID =  req.query.accountId;
  request(riotURLCreator('matches', riot.key, {accID}), (err,response,body) =>{
    !err ? res.send(JSON.parse(response.body)) : console.log(err);
  })
})
app.get('/api/match', function(req,res){
  let gameId = req.query.gameId;
  request(riotURLCreator('match',riot.key,{gameId}), (err,response,body) =>{
    !err ? res.send(JSON.parse(response.body)) : console.log(err);
  })
})


app.listen(3000, function(){
  console.log('Youre listening on port 3000!')
})