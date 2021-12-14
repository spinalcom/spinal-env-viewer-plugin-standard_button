/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import {
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

import {
  utilities,
  SELECTrelationList,
  isShownParam
} from "./utilities";

class SpinalContextIsolation extends SpinalContextApp {
  constructor() {
    super("isolation button", "zoom button", {
      icon: "settings_overscan",
      icon_type: "in"
    });
  }

  isShown(option) {
    const type = option.selectedNode.type.get();
    if (isShownParam.indexOf(type) > -1)
      return (Promise.resolve(true));
    return (Promise.resolve(-1))
  }

  action(option) {
    this.viewer = window.spinal.ForgeViewer.viewer
    let self = this;
    let boolSameNode = false
    let modelResetIsolate = []
    let aggregateIsolation = []
    let realNode = SpinalGraphService.getRealNode(option.selectedNode.id
      .get());
    if (this.lastNode == undefined) {
      this.lastNode = realNode
    } else {
      aggregateIsolation = this.viewer.getAggregateIsolation()
      if (this.lastNode.info.id.get() == realNode.info.id.get() &&
        aggregateIsolation.length) {
        boolSameNode = true
      } else {
        this.lastNode = realNode
      }
    }
    if (boolSameNode) {
      for (let i = 0; i < aggregateIsolation.length; i++) {
        const element = aggregateIsolation[i];
        self.viewer.isolate(0, element.model)
      }
    } else {
      this.viewer = window.spinal.ForgeViewer.viewer
      realNode.find(SELECTrelationList,
        function (node) {
          if (node.info.type.get() === "BIMObject") return true;
        }).then(lst => {
          utilities.sortBIMObjectByModel(lst).then(lstByModel => {
            for (let i = 0; i < lstByModel.length; i++) {
              const element = lstByModel[i];
              for (let j = 0; j < element.model.modelScene
                .length; j++) {
                const scene = element.model.modelScene[j];
                if (element.dbid.length != 0) {
                  self.viewer.isolate(element.dbid, scene.model)
                } else {
                  let rootId = scene.model.getRootId()
                  scene.model.getObjectTree((tree) => {
                    let dbidRoot = tree.nodeAccess.dbIdToIndex[
                      rootId]
                    self.viewer.isolate([dbidRoot], scene.model)
                  })
                }
              }
            }
          })
        });
    }
  }
}

export {
  SpinalContextIsolation
};