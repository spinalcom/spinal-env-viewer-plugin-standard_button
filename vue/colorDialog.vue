<template>
  <md-dialog :md-active.sync="showDialog" @md-closed="closeDialog(false)">
    <md-dialog-title>Edit Color</md-dialog-title>

    <md-dialog-content class="colorDialogContainer">
      <chrome-picker v-model="color" />
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog(false)"
        >Cancel</md-button
      >
      <md-button class="md-primary" @click="closeDialog(true)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { Chrome } from "vue-color";

export default {
  name: "editColordialogComponent",
  props: ["onFinised"],
  components: {
    "chrome-picker": Chrome,
  },
  data() {
    return {
      showDialog: true,
      color: "#000000",
      selectedNode: null,
    };
    
  },
  methods: {
    opened(option) {
      if (option.selectedNode.color) {
        this.color = option.selectedNode.color.get();
      }
      this.selectedNode = SpinalGraphService.getRealNode(
        option.selectedNode.id.get()
      );
    },
    removed(option) {
      if (option.closeResult === true) {
        const color =
          typeof this.color === "string" ? this.color : this.color.hex;
        if (this.selectedNode.info.color) {
          this.selectedNode.info.color.set(color);
        } else {
          this.selectedNode.info.add_attr({ color: color });
        }
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    },
  },
};
</script>

<style scoped>
.colorDialogContainer {
}
</style>