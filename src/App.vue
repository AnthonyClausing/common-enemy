<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import axios from 'axios'
import riot from '../riot_api_key'
//console.log(riot.key)
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
  //  // axios.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/himay85?api_key=${riot.key}`)
  //   .then(res => {
  //     console.log(res.data)
  //   })
  //   .catch(err => console.log(err))
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
