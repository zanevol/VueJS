import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		activeModal: '',
		activeModal2: '',
		paymentsList: JSON.parse(localStorage.getItem("paymentsList") || '[]'),
		editList: {},
	},

	actions: {
		setActiveModal({ commit }, activeModalName) {
			commit('SETACTIVEMODAL', activeModalName);
		},
		setActiveModal2({ commit }, activeModalName) {
			commit('SETACTIVEMODAL2', activeModalName);
		},
		setPaymentsList({ commit }, payment) {
			commit('createPaymentsList', payment);
		},
		deleteEl({ commit }, id) {
			commit('delElem', id);
		},
		editEl({ commit }, item) {
			commit('editElem', item);
		}
	},

	mutations: {
		updatePaymentsList(state, paymentsList) {
			state.paymentsList = paymentsList;
		},
		createPaymentsList(state, payment) {
			state.paymentsList.push(payment);
			localStorage.setItem('paymentsList', JSON.stringify(state.paymentsList));
		},
		editElem(state, { date, category, value, id }) {
			const payments = state.paymentsList.concat(),
				idx = payments.findIndex(t => t.id === id),
				payment = payments[idx];
			payments[idx] = { ...payment, date, category, value };
			state.paymentsList = payments;
			localStorage.setItem('paymentsList', JSON.stringify(state.paymentsList));
		},
		delElem(state, id) {
			state.paymentsList = state.paymentsList.filter((t, i) => i !== id);
			localStorage.setItem('paymentsList', JSON.stringify(state.paymentsList));
		},

		SETACTIVEMODAL(state, activeModalName) {
			state.activeModal = activeModalName;
		},
		SETACTIVEMODAL2(state, activeModalName) {
			state.activeModal2 = activeModalName;
		},

	},

	getters: {
		allPaymentsList: state => state.paymentsList,
		ACTIVEMODAL: state => state.activeModal,
		ACTIVEMODAL2: state => state.activeModal2
	},

})
