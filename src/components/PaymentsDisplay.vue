<template>
  <div class="payments-list" @click.stop="activeModal2 = ''">
    <div class="payments-list-header">
      <div class="payments-list-header-count">
        <span>#</span>
      </div>
      <div class="payments-list-header-date">
        <span>Date</span>
      </div>
      <div class="payments-list-header-category">
        <span>Category</span>
      </div>
      <div class="payments-list-header-value">
        <span>Value</span>
      </div>
    </div>

    <div class="payments-list-wrapper">
      <div
        class="payments-list-wrapper-table"
        v-for="(item, idx) in list"
        :key="idx"
      >
        <div class="payments-list-wrapper-table-count">
          <span>{{ currentPage * sizePage - sizePage + (idx + 1) }}</span>
        </div>
        <div class="payments-list-wrapper-table-date">
          <span>{{ item.date }}</span>
        </div>
        <div class="payments-list-wrapper-table-category">
          <span>{{ item.category }}</span>
        </div>
        <div class="payments-list-wrapper-table-value">
          <span>{{ item.value }}</span>
          <span
            class="payments-list-wrapper-table-value-menu"
            @click.stop="showContextMenu($event, idx, item)"
          ></span>
        </div>
      </div>
    </div>

    <ContextMenu
      v-show="activeModal2 === 'context'"
      @editElem="editElem"
      @deleteElem="delElem"
    />

    <AddPayment
      v-show="activeModal === 'showAddPayModal'"
      :edit-item="editItem"
      :id="elemId"
      @closeModal="activeModal = ''"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AddPayment from "./AddPayment.vue";
const ContextMenu = () => import("./ContextMenu.vue");

export default {
  name: "PaymentsDisplay",
  components: { ContextMenu, AddPayment },
  props: {
    list: Array,
    currentPage: Number,
    sizePage: Number,
  },
  data() {
    return {
      elemId: null,
      editItem: {},
    };
  },
  methods: {
    ...mapActions(["deleteEl"]),
    showContextMenu(event, id, item) {
      const context = document.querySelector(".context-wrapper");
      context.style.top = `${event.clientY - 170}px`;
      context.style.right = 0;
      this.elemId = id;
      this.editItem = JSON.parse(JSON.stringify(item));
      this.activeModal2 = "context";
    },
    editElem() {
      this.activeModal = "showAddPayModal";
      this.activeModal2 = "";
    },
    delElem() {
      this.deleteEl(this.elemId);
      this.activeModal2 = "";
    },
    closeActiveModal() {
      this.actveModal = "";
      this.editItem = {};
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
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.payments-list {
  width: 45%;
  position: relative;
  &-header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

    &-count {
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
    }

    &-date {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
    }

    &-category {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
    }

    &-value {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-wrapper {
    width: 100%;
    height: 440px;
    overflow-y: overlay;
    border: 1px solid #ccc;

    &-table {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;

      &-count {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
      }

      &-date {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
      }

      &-category {
        width: 30%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
      }

      &-value {
        position: relative;
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &-menu {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 5%;
          background: transparent url("../assets/dots_icon.svg") no-repeat
            center;
          transition: all 0.1s ease-in-out;

          &:hover {
            background: #ccc url("../assets/dots_icon.svg") no-repeat center;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>