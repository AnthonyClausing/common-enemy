<template>
  <div class="hello">
    <div align="center">
      <table class="table">
        <thead>
          <tr>
            <th>First Name___</th>
            <th>Last Name____</th>
            <th>Age___</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hi1</td>
            <td>hi2</td>
            <td>hi3</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      User : {}, 
    }
  },
  mounted(){
    axios.get('http://localhost:3000')
    .then(response => {
      console.log(response.data)
      this.User = response.data;
    })
    .catch(err => console.log(err))
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
