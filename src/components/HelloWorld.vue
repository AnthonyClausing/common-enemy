<template>
  <div class="hello">
    <div align="center">
      <h1>Hello</h1>
        <ul>
           <li v-for="answer in getAnswer" :key="answer.champ.id">
           <h5>{{answer.champ.name}}</h5>
            <img :src="`https://ddragon.leagueoflegends.com/cdn/8.18.1/img/champion/${answer.champ.image.full}`"/>
            <h2>{{answer.count}}</h2>    
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import querystring from 'querystring';
import riot from '../../riot_api_key';
import _ from 'lodash';
export default {
  name: 'HelloWorld',
  data () {
    return {
      User : "",
      Champions: {},
      Answer: {}
    }
  },
  computed:{
    getAnswer(){
      let newAnswer = []
      for(let id in this.Answer){
        // console.log(this.Answer[id], 'this.answer at id')
        //console.log(id,'inside getanswer computed')
        let count = this.Answer[id]
        let champ = _.find(this.Champions, c => c.key === id)
        newAnswer.push({champ,count})
      }
      return _.orderBy(newAnswer,["count"],["desc"]).slice(0,5)
    }
  },
  mounted(){
      // TODO Turn below axios calls into state actions 
      axios.get('http://localhost:3000/api/champions')
        .then(res => {
          this.Champions = res.data.data
        })
        .catch(err => console.log(error,'from HW.vue'))
      axios.get('http://localhost:3000/api/summoner?name=Blitzkreeg8')
        .then( res => {
          axios.get(`http://localhost:3000/api/matches?accountId=${res.data.accountId}`)
        .then(  res => {
          return this.getMatchListInfo(res.data.matches)
        })
        .then( newMatchList => {
          this.Answer = this.getChampCounts(newMatchList,'Blitzkreeg8')
        })
      })
        .catch(err => console.error(err))
  },
  methods:{
    getMatchListInfo: async function(matchList){
      let newMatchList = [];
      for(let match of matchList) {
        let matchData =  await axios.get(`http://localhost:3000/api/match?gameId=${match.gameId}`)
        newMatchList.push(matchData.data)
      }
      return newMatchList;
    },
    //can add another parameter like a bool for checking for bad allies putting it in the if block
    getChampCounts : function(games,name){
      let championCounter = {};
      games.forEach( game => {
      let partId = game.participantIdentities.find( participant => participant.player.summonerName === name).participantId;
      let enemyTeam;
      let win = game.participants[partId - 1].stats.win;
      if(!win){
        enemyTeam = partId >= 5 ? game.participants.slice(0,5) : game.participants.slice(5,10);
        enemyTeam.forEach( player => {
          if(!championCounter[player.championId]){ 
            championCounter[player.championId] = 1;
          }else{
            championCounter[player.championId]++
          }
        })
      }
      })

     console.log(championCounter)
      return championCounter;
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
