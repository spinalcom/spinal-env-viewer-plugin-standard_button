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
  <div class="research-panel-container">
    <p class="research-element">Element to fit :</p>
    <div class="research-element">
      <input v-model="toSearch">
    </div>
    <div class="md-layout">
      <md-button class="md-layout-item"
                 v-on:click="fitMethod">Zoom</md-button>
    </div>
    <hr />

  </div>
</template>

<script>
export default {
  name: "my_compo",
  data() {
    return {
      graph: "",
      toSearch: ""
    };
  },
  methods: {
    opened(option, viewer) {
      this.graph = option.graph;
    },
    fitMethod(option, viewer) {
    	console.log(this.graph);
    }
  }
};
</script>

<style>
.research-panel-container * {
  box-sizing: border-box;
}
.research-element {
  margin: auto;
  padding: auto;
  text-align: center;
  margin-top: 3%;
}
</style>