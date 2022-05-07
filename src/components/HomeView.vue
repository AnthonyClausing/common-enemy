<template>
  <div>
      <h1>Hello</h1>
      <div>
        <ul>
         <li v-for="champ in championList" :key="champ.id"> 
           <h5>{{champ.name}}</h5> 
            <img :src="`https://ddragon.leagueoflegends.com/cdn/12.8.1/img/champion/${champ.image.full}`"/> 
          </li>
        </ul>
      </div>
      <!-- <top-enemies :championCount="getAnswer"></top-enemies> -->
  </div>
</template>

<script>
import axios from 'axios';
// import TopEnemies from './TopEnemies.vue';
import _ from 'lodash';

export default {
  name: 'HomeView',
  components:{
    // TopEnemies
  },
  data () {
    return {
      User : "",
      Answer: {}
    }
  },
  computed:{
    isLoading(){
      return this.$store.state.loading
    },
    championList(){
      return this.$store.state.champions
    },
    getAnswer(){
      let newAnswer = []
      for(let id in this.Answer){
        let count = this.Answer[id]
        let champ = _.find(this.championList, c => c.key === id)
        newAnswer.push({champ,count})
      }
      return _.orderBy(newAnswer,["count"],["desc"]).slice(0,5)
    }
  },
  mounted(){
      this.$store.dispatch('getChampions')
      // TODO Turn below axios calls into state actions 
      // axios.get('http://localhost:3000/api/summoner?name=SaltFreeRobot')
      //   .then( res => {
      //     axios.get(`http://localhost:3000/api/matches?accountId=${res.data.accountId}`)
      //   .then(  res => {
      //     return this.getMatchListInfo(res.data.matches)
      //   })
      //   .then( newMatchList => {
      //     this.Answer = this.getChampCounts(newMatchList,'SaltFreeRobot')
      //   })
      // })
      //   .catch(err => console.error(err))
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
h1, h2, h3, h4, h5, p {
  font-weight: normal;
  color:#efbe4c;
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
