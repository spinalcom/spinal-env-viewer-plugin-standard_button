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

import { SpinalGraphService } from 'spinal-env-viewer-graph-service';

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

import {
  utilities,
  SELECTrelationList,
  isShownParam
} from "./utilities";

class SpinalContextSelectBIMObject extends SpinalContextApp {
  constructor() {
    super("select BIMObject button", "select BIMObject button", {
      icon: "devices",
      icon_type: "in"
    });
  }

  isShown(option) {
    const type = option.selectedNode.type.get();
    if (isShownParam.indexOf(type) > -1) { return (Promise.resolve(true)); }
    return (Promise.resolve(-1));
  }
  async action(option) {
    this.viewer = window.spinal.ForgeViewer.viewer;
    let realNode = SpinalGraphService.getRealNode(option.selectedNode.id.get());
    const nodes = await realNode.find(SELECTrelationList,
      (node) => node.info.type.get() === "BIMObject");
    const lstByModel = await utilities.sortBIMObjectByModel(nodes);
    const arrayToFit = utilities.organizeBimObjectForAggregateViewer(lstByModel, 'ids');
    this.viewer.clearSelection();
    this.viewer.setAggregateSelection(arrayToFit);
  }
}

export {
  SpinalContextSelectBIMObject
};
