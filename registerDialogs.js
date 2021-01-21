import vue from "vue";
import dialogDeleteComponent from "./vue/deletePanel.vue";
import dialogRenameComponent from "./vue/renamePanel.vue";
import dialogResearchComponent from "./vue/researchPanel.vue";
import EditColordialogComponent from "./vue/colorDialog.vue";


const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

const dialogs = [
  {
    name: "standardButtonDelete",
    vueMountComponent: vue.extend(dialogDeleteComponent),
    parentContainer: document.body
  }, {
    name: "standardButtonRename",
    vueMountComponent: vue.extend(dialogRenameComponent),
    parentContainer: document.body
  }, {
    name: "standardButtonResearch",
    vueMountComponent: vue.extend(dialogResearchComponent),
    parentContainer: document.body
  },
  {
    name: "editColordialogComponent",
    vueMountComponent: vue.extend(EditColordialogComponent),
    parentContainer: document.body
  }
];

for (let index = 0; index < dialogs.length; index++) {
  SpinalMountExtention.mount(dialogs[index]);
}