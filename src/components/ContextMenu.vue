<template>
  <div class="context-wrapper">
    <div class="context-wrapper-edit" @click.stop="editElem">
      <span class="context-wrapper-edit-img"></span>
      <span class="context-wrapper-edit-text">Редактировать</span>
    </div>

    <div class="context-wrapper-delete" @click.stop="deleteElem">
      <span class="context-wrapper-delete-img"></span>
      <span class="context-wrapper-delete-text">Удалить</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {};
  },
	methods:{
		editElem(){
			this.$emit('editElem');
		},
		deleteElem(){
			this.$emit('deleteElem');
		}
	}
};
</script>

<style lang="scss" scoped>
.context-wrapper {
  position: absolute;
  width: 140px;
  height: 60px;
  top: 90px;
  right: 0;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  background: #fff;
  border-radius: 5px;
  box-sizing: border-box;
	z-index: 5;

  &-edit {
    height: 30px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    &-img {
      width: 30px;
      height: 30px;
      background: url("../assets/pencil_icon.svg") no-repeat center / 20px;
      border-right: 1px solid #ccc;
    }

    &-text {
      font-size: 14px;
      margin-left: 5px;
    }

    &:hover {
      background: #eee;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      cursor: pointer;
    }
  }

  &-delete {
    height: 30px;
    display: flex;
    align-items: center;

    &-img {
      width: 30px;
      height: 30px;
      background: url("../assets/trash_icon.svg") no-repeat center / 17px;
      border-right: 1px solid #ccc;
    }

    &-text {
      font-size: 14px;
      margin-left: 5px;
    }

    &:hover {
      background: #eee;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>