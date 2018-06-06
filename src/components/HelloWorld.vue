<template>
  <div class="hello">
    <div align="center">
      <h1>Hello</h1>
        <ul>
         <li v-for="champ in Champions" :key="champ.id">
           <h5>{{champ.name}}</h5>
            <img :src="`https://ddragon.leagueoflegends.com/cdn/8.7.1/img/champion/${champ.image.full}`"/>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import querystring from 'querystring';
import riot from '../../riot_api_key';
export default {
  name: 'HelloWorld',
  data () {
    return {
      User : "",
      Champions: {}
    }
  },
  mounted(){
      axios.get('http://localhost:3000/api/summoner?name=himay85')
      .then( res => {
        axios.get(`http://localhost:3000/api/matches?accountId=${res.data.accountId}`)
        .then(  res => {
          return this.getMatchListInfo(res.data.matches)
        })
        .then( newMatchList => {
          console.log(this.getChampCounts(newMatchList,'Himay85'));
        })
      })
      .catch(err => console.error(err))
  },
  methods:{
    getMatchListInfo: async function(matchList){
      let newMatchList = [];
      for(let match of matchList) {
        let whatever =  await axios.get(`http://localhost:3000/api/match?gameId=${match.gameId}`)
        newMatchList.push(whatever.data)
      }
      return newMatchList;
    },
    //can add another parameter like a bool for checking for bad allies putting it in the if block
    getChampCounts : function(games,name){
      let champCountObj = {};
      //console.log(games)
      games.forEach( game => {
      let partId = game.participantIdentities.find( participant => participant.player.summonerName === name).participantId;
      console.log(partId, 'partId')
      let enemyTeam;
      let win = game.participants[partId - 1].stats.win;
      if(!win){
        enemyTeam = partId >= 5 ? game.participants.slice(5,10) : game.participants.slice(0,5);
        console.log(enemyTeam)
        enemyTeam.forEach( player => {
         if(!champCountObj[player.championId]){
            champCountObj[player.championId] = 1;
         }else{
            champCountObj[player.championId]++;
         }
        })
      }
      })
      return champCountObj;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
