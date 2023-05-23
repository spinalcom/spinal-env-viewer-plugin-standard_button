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
    <md-dialog :md-active.sync="showDialog" @md-closed="closeDialog(false)">
      <md-dialog-title
        >Delete action on node selected : {{ name }}</md-dialog-title
      >
      <div class="DeleteMainBody">
        <md-field>
          <label for="Select how you want the delete to operate">
            Select how you want the delete to operate
          </label>
          <md-select id="modeSelect" name="modeSelect" v-model="selectedMode">
            <md-option
              v-for="option in modeOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </md-option>
          </md-select>
        </md-field>
        <div v-if="selectedMode === 'Delete nodes'">
          <md-radio class="md-primary" v-model="selectedOption" value="1">
            This node only
          </md-radio>
          <md-radio class="md-primary" v-model="selectedOption" value="2">
            This node's children nodes
          </md-radio>
          <md-radio class="md-primary" v-model="selectedOption" value="3">
            This node <strong> and </strong> children nodes
          </md-radio>
          <md-radio class="md-primary" v-model="selectedOption" value="4">
            All nodes of similar type in the same context</md-radio
          >

          <div v-if="selectedOption === '4' || selectedOption === '2'">
            <md-field>
              <label>Filter value : </label>
              <md-input v-model="strFilter"></md-input>
            </md-field>
            <b v-if="strFilter == ''"> !! If the filter is empty, all nodes will be captured !! </b>
            <div v-else>
              <md-radio v-model="strictFilter" :value="true">
                Strict filter (node name has to match exactly the filter value)
              </md-radio>
              <md-radio v-model="strictFilter" :value="false">
                Not strict filter (node name should contain the filter
                value)</md-radio
              >
            </div>
          </div>

          <div>
            <p>--------------------</p>
            <strong> Exclude if : </strong>
            <md-radio
              :disabled="selectedOption == '1' || selectedOption == '4'"
              v-model="excludeOption"
              value="1"
            >
              Node has another parent
            </md-radio>
            <md-radio
              :disabled="selectedOption == '1' || selectedOption == '4'"
              v-model="excludeOption"
              value="2"
            >
              Node has another parent in the same context
            </md-radio>
            <md-radio
              :disabled="selectedOption == '1' || selectedOption == '4'"
              v-model="excludeOption"
              value="3"
            >
              Node has another parent in another context
            </md-radio>
          </div>
        </div>

        <div v-if="selectedMode === 'Delete relations'">
          <md-radio class="md-primary" v-model="selectedOption" value="1">
            Relation with parent in this context
          </md-radio>
          <md-radio class="md-primary" v-model="selectedOption" value="2">
            Children relations
          </md-radio>
          <!-- <md-radio
            disabled
            class="md-primary"
            v-model="selectedOption"
            value="3"
          >
            Parent relations (NYI)
          </md-radio> -->
          <md-button v-if="selectedOption == '2'" @click="searchRelations()">
            Search relations
          </md-button>
          <div v-if="searchedRelations.length > 0">
            <md-checkbox
              v-for="item in searchedRelations"
              :key="item"
              v-model="selectedRelations"
              :value="item"
              >{{ item }}</md-checkbox
            >
          </div>
        </div>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog(false)"
          >Cancel</md-button
        >
        <md-button class="md-primary" @click="closeDialog(true)"
          >Accept</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import {
  SpinalGraphService,
  SPINAL_RELATION_PTR_LST_TYPE,
  SPINAL_RELATION_LST_PTR_TYPE,
  SpinalNode,
} from 'spinal-env-viewer-graph-service';
export default {
  name: 'dialogComponent',
  props: ['onFinised'],
  data() {
    return {
      showDialog: true,
      selectedNode: null,
      selectedContext: null,
      selectedMode: 'Delete nodes',
      selectedOption: '1',
      excludeOption: null,
      relationNames: null,
      modeOptions: ['Delete nodes', 'Delete relations'],
      searchedRelations: [],
      selectedRelations: [],
      strictFilter: false,
      strFilter: '',
      name: '',
    };
  },
  methods: {
    opened(option) {
      console.log('opened : ', option);
      this.name = option.selectedNode.name.get();
      this.selectedNode = option.selectedNode;
      this.selectedContext = option.context;
    },
    removed(option) {
      if (option.closeResult === true) {
        console.log('closed : ', option);
        this.routage();
        this.showDialog = false;
      }
      this.showDialog = false;
    },

    deleteNode() {
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      node.removeFromGraph();
    },

    deleteChildren() {
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      node.getChildren().then((children) => {
        this.applyFilter(children).then((filteredChildren) => {
          const strFilteredChildren = this.applyStrFilter(filteredChildren);
          for (const child of strFilteredChildren) {
            child.removeFromGraph();
          }
        });
      });
    },

    deleteNodeAndChildren() {
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      node.getChildren().then((children) => {
        this.applyFilter(children).then((filteredChildren) => {
          const strFilteredChildren = this.applyStrFilter(filteredChildren);
          for (const child of strFilteredChildren) {
            child.removeFromGraph();
          }
        });
      });
      node.removeFromGraph();
    },

    deleteAllNodesOfSameTypeInSameContext() {
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      SpinalGraphService.findInContextByType(
        this.selectedContext.id.get(),
        this.selectedContext.id.get(),
        node.getType().get()
      ).then((models) => {
        const nodes = models.map((m) =>
          SpinalGraphService.getRealNode(m.id.get())
        );
        console.log('nodes :', nodes);
        const strFilteredNodes = this.applyStrFilter(nodes);
        for (const filteredNode of strFilteredNodes) {
          //let realNode = SpinalGraphService.getRealNode(node.id.get());
          filteredNode.removeFromGraph();
        }
      });
    },

    deleteRelationWithParentInContext() {
      console.log('deleteRelationWithParentInContext');
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      // look for parents
      node.getParents().then((parents) => {
        console.log('parents : ', parents);
        for (const p of parents) {
          // if parent is in the same context
          if (p.getContextIds().includes(this.selectedContext.id.get())) {
            console.log('Parent of same context found : ', p.info.name.get());
            // look for relations
            for (const r of p.getRelationNames()) {
              // Verify if the node is a child of the parent
              SpinalGraphService.isChild(
                p.info.id.get(),
                this.selectedNode.id.get(),
                r
              ).then((res) => {
                if (res) {
                  console.log('Attempting to remove');
                  this.removeChild(p, node, r);
                } else console.log('Child not found');
              });
            }
          }
        }
      });
    },

    async deleteChildrenRelations() {
      //here we should call removeChild , then if no childs are left we should remove the relation
      console.log('deleteChildrenRelations');
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      for (const r of this.selectedRelations) {
        const children = await node.getChildren(r);
        for (const child of children) {
          this.removeChild(node, child, r);
        }
        try {
          console.log('Trying to remove relation : ', r);
          node.removeRelation(r, SPINAL_RELATION_PTR_LST_TYPE);
        } catch (e) {
          try {
            node.removeRelation(r, SPINAL_RELATION_LST_PTR_TYPE);
          } catch (e) {
            console.log(e);
          }
        }
      }
    },

    searchRelations() {
      let node = SpinalGraphService.getRealNode(this.selectedNode.id.get());
      let relations = node.getRelationNames();
      this.searchedRelations = relations;
      this.selectedRelations = relations;
      console.log(relations);
    },

    async applyFilter(nodes) {
      const res = [];
      switch (this.excludeOption) {
        case '1': // filter out the nodes that have a parent that is not the selected node
          for (const node of nodes) {
            const parents = await node.getParents();
            let filteredOut = false;
            for (const p of parents) {
              if (p.info.id.get() != this.selectedNode.id.get()) {
                filteredOut = true;
                break;
              }
            }
            if (!filteredOut) res.push(node);
          }
          return res;

        case '2': // filter out the nodes that have another parent in the same context
          for (const node of nodes) {
            const parents = await node.getParents();
            let filteredOut = false;
            for (const p of parents) {
              if (p.info.id.get() != this.selectedNode.id.get()) {
                const parentContextIds = p.getContextIds(); // get the context ids of the parent
                if (parentContextIds.includes(this.selectedContext.id.get())) {
                  filteredOut = true;
                  break;
                }
              }
            }
            if (!filteredOut) res.push(node);
          }
          return res;
        case '3': //filter out the nodes that have another parent in another context
          for (const node of nodes) {
            const parents = await node.getParents();
            let filteredOut = false;
            for (const p of parents) {
              if (p.info.id.get() != this.selectedNode.id.get()) {
                const parentContextIds = p.getContextIds(); // get the context ids of the parent
                if (!parentContextIds.includes(this.selectedContext.id.get())) {
                  filteredOut = true;
                  break;
                }
              }
            }
            if (!filteredOut) res.push(node);
          }
          return res;
        default:
          return nodes;
      }
    },

    applyStrFilter(nodes) {
      if (this.strFilter == '') return nodes;
      return nodes.filter((node) => {
        if (this.strictFilter) {
          return node.info.name.get() == this.strFilter;
        } else return node.info.name.get().includes(this.strFilter);
      });
    },

    routage() {
      if (this.selectedMode === 'Delete nodes') {
        if (this.selectedOption === '1') {
          this.deleteNode();
        } else if (this.selectedOption === '2') {
          this.deleteChildren();
        } else if (this.selectedOption === '3') {
          this.deleteNodeAndChildren();
        } else if (this.selectedOption === '4') {
          this.deleteAllNodesOfSameTypeInSameContext();
        }
      } else if (this.selectedMode === 'Delete relations') {
        if (this.selectedOption === '1') {
          this.deleteRelationWithParentInContext();
        } else if (this.selectedOption === '2') {
          this.deleteChildrenRelations();
        } else if (this.selectedOption === '3') {
          this.deleteParentRelations();
        }
      }
    },

    removeChild(p, node, r) {
      try {
        p.removeChild(node, r, SPINAL_RELATION_PTR_LST_TYPE);
      } catch (e) {
        try {
          p.removeChild(node, r, SPINAL_RELATION_LST_PTR_TYPE);
        } catch (e) {
          console.log(e);
        }
      }
    },

    closeDialog(closeResult) {
      if (typeof this.onFinised === 'function') {
        this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    },
  },
};
</script>

<style scoped>
.DeleteMainBody {
  margin: 20px;
}

.md-radio {
  display: flex;
}
</style>
