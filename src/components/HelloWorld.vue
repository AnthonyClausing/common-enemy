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
    
    axios.get('http://localhost:3000/api/champList')
    .then(res => {
      //console.log(res)
      this.Champions = res.data.data;
      console.log(this.Champions)
    })
    .catch(err => console.error(err))
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
