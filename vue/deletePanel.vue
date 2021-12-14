<!--
Copyright 2018 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>Delete {{ name }}</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog(false)">Cancel</md-button>
        <md-button class="md-primary"
                   @click="closeDialog(true)">Accepte</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { SpinalGraphService } from 'spinal-env-viewer-graph-service';
export default {
  name: "dialogComponent",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      selectedNode: null,
      name: ""
    };
  },
  methods: {
    opened(option) {
      this.name = option.selectedNode.name.get();
      this.selectedNode = option.selectedNode;
    },
    removed(option) {
      if (option.closeResult === true) {
        let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());

        node.removeFromGraph();
        this.showDialog = false;
      }
      this.showDialog = false;
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function") {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    }
  }
};
</script>