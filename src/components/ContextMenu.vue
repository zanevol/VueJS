<template>
  <v-menu bottom left :value="context" :position-x="x" :position-y="y">
    <v-list nav dense class="pa-0">
      <v-list-item @click.stop="$emit('editElem')">
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Редактировать</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click.stop="$emit('deleteElem')">
        <v-list-item-icon>
          <v-icon>mdi-delete</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Удалить</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    context: Boolean,
    x: Number,
    y: Number,
  },
  data() {
    return {};
  },
};
</script>
