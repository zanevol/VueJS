<template>
  <button @click.stop="clickHandler">Button1</button>
</template>

<script>
export default {
  name: "Btns",
  emits: {
    "custom-event-1": null,
    "custom-event-2"(payload) {
      return !!(payload?.name && payload?.role);
    },
  },
  methods: {
    clickHandler() {
      this.$emit("custom-event-1", "data-1");
      this.$emit("custom-event-2", {
        name: "Andrey",
        role: "admin",
      });
    },
  },
};
</script>
