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
  <div class="delete-panel-container">
      <div class="warningMessage">
          <p class="warningDelete">You really want to delete element?</p>
    </div>
    <div class="md-layout">
            <md-button class="md-button-accept"
                 v-on:click="deleteMethod">Delete</md-button>
            <md-button class="md-button-cancel"
                 v-on:click="cancelMethod">Cancel</md-button>
    </div>
    <hr/>

  </div>
</template>

<script>
export default {
  name: "my_compo",
  data() {
    return {
      currentNode: ""
    };
  },
  methods: {
    opened(option, viewer) {
      this.currentNode = option;
    },
    deleteMethod(option, viewer) {
      this.currentNode.selectedNode.removeFromGraph();
    },
    cancelMethod(option, viewer) {
      let el = document.getElementsByClassName("dockingPanelClose");
      el[4].click();
    }
  }
};
</script>

<style>
.delete-panel-container * {
  box-sizing: border-box;
}
.warningDelete {
  text-align: center;
  font-size: 120%;
}
.md-button-accept {
  background-color: red;
  margin: auto;
  padding: auto;
}
.md-button-cancel {
  margin: auto;
  padding: auto;
}

</style>