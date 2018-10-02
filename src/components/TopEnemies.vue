<<template>
<b-row>
  <b-col offset="3">
  <b-list-group class="enemy">
    <b-list-group-item v-for="(count, id) in championCount" :key="count.champ.id"> 
      <h5>{{count.champ.name}}</h5>
            <img :src="`https://ddragon.leagueoflegends.com/cdn/8.18.1/img/champion/${count.champ.image.full}`"/>
            <h2>{{count.count}}</h2> 
      <p>{{id}} : {{count}}</p>
    </b-list-group-item>
  </b-list-group>
  </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'TopEnemies',
  props:['championCount'],
  data () {
    return {
    }
  },
  mounted(){
  }
}
</script>
