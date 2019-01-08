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

const {
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const spinalgraph = require("spinal-model-graph");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

import { search_node } from './external.js';

class SpinalContextSortByName extends SpinalContextApp {
  constructor() {
    super("sort button", "sort button", {
      icon: "sort_by_alpha",
      icon_type: "in"
    });
    this.sorted = false;
  }

  isShown(option) {
  //  if (option.selectedNode instanceof spinalgraph.SpinalContext)
      return (Promise.resolve(true));
//    else
//      return (-1);
  }

  action(option) {
    search_node(option.selectedNode, this.sorted, option.selectedNode.name.get());
    this.sorted = !this.sorted;
  }
}
 
export { SpinalContextSortByName };
