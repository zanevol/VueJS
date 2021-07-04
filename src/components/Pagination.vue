<template>
  <div class="body-footer-pagination">
    <div class="body-footer-pagination-count">
      <span> Записей: {{ countLists }} </span>
    </div>

    <div class="body-footer-pagination-buttons">
      <button
        @click="firstPage"
        :disabled="currentPage == 1"
        class="pagination__button"
      >
        &lt;&lt;
      </button>
      <button
        @click="prevPage"
        :disabled="currentPage == 1"
        class="pagination__button"
      >
        &lt;
      </button>
      <button
        @click="changePage(page)"
        v-for="(page, index) in pages"
        :key="index"
        class="page__button"
        :class="{ 'page__button-active': currentPage == page }"
      >
        {{ page }}
      </button>
      <span v-if="totalPages > 0">из {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage == totalPages"
        class="pagination__button"
      >
        >
      </button>
      <button
        @click="lastPage"
        :disabled="currentPage == totalPages"
        class="pagination__button"
      >
        >>
      </button>
    </div>

    <div class="body-footer-pagination-size">
      <span>Показывать по:</span>
      <span v-if="size == 10" class="pages__count activePagesAmount">10</span>
      <span v-else @click="changeSizeRecords(10)" class="pages__count">10</span>
      <span v-if="size == 20" class="pages__count activePagesAmount">20</span>
      <span v-else @click="changeSizeRecords(20)" class="pages__count">20</span>
      <span v-if="size == 30" class="pages__count activePagesAmount">30</span>
      <span v-else @click="changeSizeRecords(30)" class="pages__count">30</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasePagination",
  props: {
    currentPage: {
      // текущая страница
      type: Number,
      default: () => 0,
    },
    size: {
      // количество записей на странице
      type: Number,
      default: () => 0,
    },
    countLists: {
      // количество записей на странице
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    /**
     * Метод перехода на первую страницу
     **/
    firstPage() {
      this.changePage(1);
    },

    /**
     * Метод перехода на предыдущую страницу
     **/
    prevPage() {
      this.changePage(this.currentPage - 1);
    },

    /**
     * Метод перехода на слудующую страницу
     **/
    nextPage() {
      this.changePage(this.currentPage + 1);
    },

    /**
     * Метод перехода на последную страницу
     **/
    lastPage() {
      this.changePage(this.totalPages);
    },

    /**
     * Метод переход на указанную страницу
     **/
    changePage(page) {
      this.$emit("changeCurrentPage", page);
    },

    /**
     * Метод изменяющий количество записей на странице
     **/
    changeSizeRecords(records) {
      this.$emit("changeSizeRecords", records);
    },
  },
  computed: {
    /**
     * Метод подсчета количества страниц для пагинации
     */
    totalPages() {
      return this.countLists ? Math.ceil(this.countLists / this.size) : 0;
    },
    /**
     * Диапазон страниц
     **/
    pages() {
      let pagesNumbers = [];

      // перебор диапозона страниц с заданым смещением
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pagesNumbers.push(i); // пуш индекса страницы
      }

      return pagesNumbers;
    },

    /**
     * Начало диапазона страниц
     **/
    rangeStart() {
      let start = this.currentPage - 2; // смещение на 2 страницы

      return start > 0 ? start : 1;
    },

    /**
     * Конец диапазона страниц
     **/
    rangeEnd() {
      let end = this.currentPage + 2; // смещение на 2 страницы

      return end <= this.totalPages ? end : this.totalPages;
    },
  },
};
</script>

<style scoped lang="scss">
.body {
  &-footer {
    &-pagination {
      width: 45%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      border: 1px solid #ccc;
      margin-top: 5px;

      &-buttons {
        span {
          padding-top: 2px;
          padding-left: 5px;
        }

        button {
          border: 0;
          padding: 2px;
          margin-left: 5px;
          font-size: 14px;
          cursor: pointer;
        }

        .pagination__button {
          background-color: #e6e6e6;
        }

        .page__button {
          padding: 4px;
          background-color: transparent;
          margin-left: 5px;
        }

        .page__button:hover {
          background-color: #b2b3af;
          color: #fff;
        }

        .page__button-active {
          background-color: #b2b3af;
          color: #fff;
        }
      }

      &-size {
        display: flex;
        align-items: center;
        font-size: 14px;
				margin-right: 5px;

        .pages__count {
          margin-left: 10px;
          color: blue;
          text-decoration: underline;
          cursor: pointer;
        }
      }

			&-count {
				margin-left: 5px;
			}

      .activePagesAmount {
        color: #ccc !important;
        text-decoration: none !important;
        cursor: auto !important;
      }
    }
  }
}
</style>