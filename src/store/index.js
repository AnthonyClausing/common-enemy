import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({

  state:{
    user: '',
    champions: {},
    loading: false
  },
  actions:{
    getChampions({commit}){
      commit('IS_LOADING', true);
      axios.get('http://localhost:3000/api/champions')
      .then(res =>{
        commit('SET_CHAMPIONS',res.data.data)
        return res.data.data
      })
      .catch(err => console.error(err))
      .finally(()=>{
        commit('IS_LOADING', false)
      })
    }
  },
  mutations:{
    SET_CHAMPIONS(state,champions){
      state.champions = champions
    },
    IS_LOADING(state,bool){
      state.loading = bool
    },
    SET_USER(state, str){
      state.user = str
    }

  },
  getters:{
    getChampions(state){
      return state.champions
    }
  }
})
export default store