<template>
  <div class="hello">
    <div align="center">
      <h1>Hello</h1>
        <ol>
          <li v-for="champ in Champions" v-bind:key="champ.id">
            {{champ.image.full}}
            <img src="champ.image"/>
          </li>
        </ol>
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
      User : {},
      Champions: []
    }
  },
  mounted(){
    
    // axios.get(`https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&tags=tags&api_key=${riot.key}`)
    // .then(res => {
    //   console.log(res.data)
    //   this.Champions = res.data.data
    // })
    // .catch(err => console.log(err))
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
