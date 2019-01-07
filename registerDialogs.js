import vue from "vue";
import dialogDeleteComponent from "./vue/deletePanel.vue";
import dialogRenameComponent from "./vue/renamePanel.vue";


const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const dialogDelete = [{
  name: "standardButtonDelete",
  vueMountComponent: vue.extend(dialogDeleteComponent),
  parentContainer: document.body
}];

for (let index = 0; index < dialogDelete.length; index++) {
  SpinalMountExtention.mount(dialogDelete[index]);
}


const dialogsRename = [{
  name: "standardButtonRename",
  vueMountComponent: vue.extend(dialogRenameComponent),
  parentContainer: document.body
}];

for (let index = 0; index < dialogsRename.length; index++) {
  SpinalMountExtention.mount(dialogsRename[index]);
}