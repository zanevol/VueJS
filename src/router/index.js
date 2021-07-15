import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/add/:category/',
			component: () => import('../components/Add.vue'),
			name: 'Add'
		}
	]
})

