import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({

  state(){
    return {
      user: '',
      champions: {},
      loading: false
    }
  },
  actions:{
    getChampions({commit}){
      commit('IS_LOADING', true);
      axios.get('http://localhost:3000/api/champions')
      .then(res =>{
        commit('SET_CHAMPIONS',res.data)
        return res.data
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