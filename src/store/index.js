import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		// 先设定一个默认地点
		geoLocation:'101210111',
  },
  mutations: {
		CHANGE(state,value){
			state.geoLocation = value[0]+','+value[1]
		}
  },
})
