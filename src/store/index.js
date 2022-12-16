import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		geoLocation:'101210111',
  },
  getters: {
  },
  mutations: {
		CHANGE(state,value){
			state.geoLocation = value[0]+','+value[1]
		}
  },
  actions: {
  },
  modules: {
  }
})
