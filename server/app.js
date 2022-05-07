const express = require('express');
const superagent = require('superagent');
const app  = express();
const { RIOT_API_KEY } = require('../riot_api_key.js');

function riotURLCreator(type, key, params){
    switch(type){
    case 'champions':
      return `http://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion.json`;
    case 'summoner':
      return `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${params.name}?api_key=${key}`;
    case 'matches':
      return  `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${params.accID}?endIndex=10&api_key=${key}`;
    case 'match':
      return `https://na1.api.riotgames.com/lol/match/v3/matches/${params.gameId}?api_key=${key}`
    }
}
app.use(function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Headers" : "Origin, X-Requested-With, content-type, Accept"
  });
  app.disable('x-powered-by');
  next();
 });
 
app.get('/api/champions', async (req,res) => { 
  try {
    const response = await superagent.get(riotURLCreator('champions', RIOT_API_KEY));
    const { data } = response.body;
    res.json(data);
  } catch(err) {
    console.log(err)
  }
})

app.get('/api/summoner', async (req,res) => {
  let name = req.query.name;
  try {
    const response = await superagent.get(riotURLCreator('summoner',RIOT_API_KEY,{name}));
    const data = await response.json();
    res.json(data);
  } catch(err) {
    console.log(err)
  }
})

app.get('/api/matches', async (req, res) => {
  let accID =  req.query.accountId;

  try {
    const response = await superagent.get(riotURLCreator('matches', RIOT_API_KEY, {accID}));
    const data = await response.json();
    res.json(data);
  } catch(err) {
    console.log(err)
  }
})
app.get('/api/match', async (req,res) => {
  let gameId = req.query.gameId;
  try {
    const response = await superagent.get(riotURLCreator('match',RIOT_API_KEY,{gameId}));
    const data = await response.json();
    res.json(data);
  } catch(err) {
    console.log(err)
  }
})


app.listen(3000, function(){
  console.log('Youre listening on port 3000!')
})