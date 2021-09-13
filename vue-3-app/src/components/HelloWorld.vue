<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <btns @custom-event-1="firstEvent" @custom-event-2="secondEvent" />
    <teleport to=".my-div">
      <p>From HelloWorld Component</p>
    </teleport>
  </div>
</template>

<script>
import Btns from "./Btns.vue";
export default {
  components: { Btns },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    firstEvent(data) {
      console.log("firstEvent", data);
    },
    secondEvent(data) {
      console.log("secondEvent", data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
