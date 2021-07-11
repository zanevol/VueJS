<template>
  <div class="payments-list">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentsDisplay",
  props: {
    list: Array,
    currentPage: Number,
    sizePage: Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.payments-list {
  width: 45%;

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
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>