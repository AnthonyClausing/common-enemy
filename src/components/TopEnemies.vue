<<template>
  <div class="enemies">
  <ul>
    <li v-for="(count, id ) in championCount" >
      <p>{{id}} : {{count}}</p>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'TopEnemies',
  props:['championCount'],
  data () {
    return {
    }
  },
}
</script>
