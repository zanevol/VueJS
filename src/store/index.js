import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		paymentsList: JSON.parse(localStorage.getItem("paymentsList") || '[]'),
		showModal: false,
	},

	actions: {
		fetchPaymentsList({ commit }, payment) {
			commit('createPaymentsList', payment);
		},
		fetchOpenModal({ commit }) {
			commit('openModal');
		},
		fetchCloseModal({ commit }) {
			commit('closeModal');
		},
	},

	mutations: {
		updatePaymentsList(state, paymentsList) {
			state.paymentsList = paymentsList;
		},
		createPaymentsList(state, payment) {
			state.paymentsList.push(payment);
			localStorage.setItem('paymentsList', JSON.stringify(state.paymentsList));
		},
		closeModal(state) {
			state.showModal = false;
		},
		openModal(state) {
			state.showModal === true ? state.showModal = false : state.showModal = true;
		}
	},

	getters: {
		allPaymentsList(state) {
			return state.paymentsList;
		}
	},

})
