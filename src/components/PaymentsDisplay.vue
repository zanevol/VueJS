<template>
  <v-row class="payments-list" @click.stop="context = false">
    <v-col>
      <div class="text-center text-h4 text-md-h3 mb-4">My Personal Cost</div>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn class="mb-4" :ripple="false" color="teal" dark v-on="on">
            Add New Cost
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>
          <AddPayment
            :edit-item="editItem"
            :id="elemId"
            @closeDialog="closeDialog"
          />
        </v-card>
      </v-dialog>

      <v-simple-table fixed-header height="440px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Date</th>
              <th class="text-center">Category</th>
              <th class="text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in paginatedList" :key="idx">
              <td class="text-center">
                {{ currentPage * sizePage - sizePage + (idx + 1) }}
              </td>
              <td class="text-center">{{ item.date }}</td>
              <td class="text-center">{{ item.category }}</td>
              <td class="text-center" style="position: relative">
                {{ item.value }}
                <v-btn
                  icon
                  absolute
                  style="top: 50%; right: 0; transform: translateY(-50%)"
                  @click.stop="showContextMenu($event, idx, item)"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <Pagination
        :count-lists="countLists"
        :current-page="currentPage"
        :size="sizePage"
        @changeSizeRecords="changeSizeRecords"
        @changeCurrentPage="changeCurrentPage"
      />

      <ContextMenu
        :context="context"
        :x="x"
        :y="y"
        @editElem="editElem"
        @deleteElem="delElem"
      />
    </v-col>

    <v-col align-self="center" justify="center">
      <div class="payments-chart">
        <canvas ref="canvas"></canvas>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddPayment from "./AddPayment.vue";
import Pagination from "./Pagination.vue";
import { Pie } from "vue-chartjs";
const ContextMenu = () => import("./ContextMenu.vue");

export default {
  name: "PaymentsDisplay",
  extends: Pie,
  components: { ContextMenu, AddPayment, Pagination },
  data() {
    return {
      elemId: null,
      editItem: {},
      currentPage: 1,
      sizePage: 10,
      dialog: false,
      context: false,
      x: 0,
      y: 0,
      records: [],
    };
  },
  methods: {
    ...mapActions(["deleteEl"]),
    showContextMenu(event, id, item) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.elemId = id;
      this.editItem = JSON.parse(JSON.stringify(item));
      this.context = true;
    },
    editElem() {
      this.dialog = true;
      this.context = false;
    },
    delElem() {
      this.deleteEl(this.elemId);
      this.context = false;
    },
    closeActiveModal() {
      this.actveModal = "";
      this.editItem = {};
    },
    changeCurrentPage(page) {
      this.currentPage = page;
    },

    changeSizeRecords(records) {
      this.currentPage = 1;
      this.sizePage = records;
    },

    closeDialog() {
      this.dialog = false;
    },
  },

  computed: {
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
  },

  mounted() {
    this.records = this.allPaymentsList;
    this.renderChart({
      labels: this.allPaymentsList.map((item) => item.category),
      datasets: [
        {
          label: "Payments chart",
          data: this.allPaymentsList.map((item) => {
            return this.records.reduce((total, r) => {
              if (r.id === item.id) {
                total += +r.value;
              }
              return total;
            }, 0);
          }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
.payments-chart {
  margin: auto;
}
</style>