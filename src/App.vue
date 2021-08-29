<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">My personal cost</h1>
      <Button @showActiveModal="showModal" />
      <router-link to="/add/Food/?value=500">AddFood</router-link> /
      <router-link to="/add/Transport/?value=50">AddTransport</router-link> /
      <router-link to="/add/Entertainment?value=2000"
        >AddEntrtainment</router-link
      >
      <router-view />
    </header>
    <main>
      <Payments
        :list="paginatedList"
        :currentPage="currentPage"
        :sizePage="sizePage"
      />
      <Pagination
        :count-lists="countLists"
        :current-page="currentPage"
        :size="sizePage"
        @changeSizeRecords="changeSizeRecords"
        @changeCurrentPage="changeCurrentPage"
      />
    </main>
    <AddPayment
      v-show="activeModal2 === 'addPay'"
      @closeModal="closeActiveModal"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "./components/Button.vue";
import Pagination from "./components/Pagination.vue";
import Payments from "./components/PaymentsDisplay.vue";
const AddPayment = () => import("./components/AddPayment.vue");

export default {
  components: { Payments, AddPayment, Button, Pagination },
  data() {
    return {
      //JSON.parse(localStorage.getItem("paymentsList") || [])
      currentPage: 1,
      sizePage: 10,
    };
  },

  methods: {
    showModal() {
      this.activeModal2 = "addPay";
      this.activeModal = "";
    },
    closeActiveModal() {
      this.activeModal2 = "";
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    },

    changeSizeRecords(records) {
      this.currentPage = 1;
      this.sizePage = records;
    },
  },

  computed: {
    ...mapGetters(["allPaymentsList"]),
    paginatedList() {
      let start = this.currentPage * this.sizePage - this.sizePage;
      let end = start + this.sizePage;
      let paginatedList = [];
      if (this.allPaymentsList) {
        paginatedList = this.allPaymentsList.slice(start, end);
      }
      return paginatedList;
    },

    countLists() {
      return this.allPaymentsList ? this.allPaymentsList.length : 0;
    },

    activeModal: {
      get() {
        return this.$store.getters.ACTIVEMODAL;
      },
      set(activeModalName) {
        this.$store.dispatch("setActiveModal", activeModalName);
      },
    },
    activeModal2: {
      get() {
        return this.$store.getters.ACTIVEMODAL2;
      },
      set(activeModalName) {
        this.$store.dispatch("setActiveModal2", activeModalName);
      },
    },
  },
};
</script>

<style lang="scss">
body {
  width: 1140px;
  height: 100%;
  margin: auto;
  padding: 0;
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
}

.header {
  margin: 0;
  padding-top: 50px;

  &-title {
    margin: 0;
    padding: 0;
    margin-bottom: 20px;
  }
}
</style>
