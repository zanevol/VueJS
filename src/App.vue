<template>
  <div id="app">
    <Calc />
    <router-view />
  </div>
</template>

<script>
import Calc from "./components/Calc.vue";

export default {
  components: { Calc },
};
</script>

<style lang="scss" scoped>
#app {
	width: 100%;
	height: 100%;
	display: flex;
	text-align: center;
	justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

</style>
