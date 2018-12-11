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

const {
	spinalPanelManagerService
} = require("spinal-env-viewer-panel-manager-service");

import Vue from 'vue';
import deleteComponent from '../vue/deletePanel.vue';


class SpinalContextDelete extends SpinalContextApp {
	constructor() {
		super("Delete button", "delete context", {
			icon: "delete",
			icon_type: "in"
		});
	}

	isShown(option) {
//		if (option.selectedNode instanceof spinalgraph.SpinalContext)
      			return (Promise.resolve(true));
//		else
//			return (-1);
	}

	action(option) {
    spinalPanelManagerService.openPanel("deletePanel", option);
	}
}

const extentionDeletePanel = SpinalForgeExtention.createExtention({
  name: "deletePanel",
  vueMountComponent: Vue.extend(deleteComponent),
  // toolbar is optional
  panel: {
    title: "Delete element",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    left: "405px",
    height: "159px",
    'min-height': '16vh'
  },
  onload: () => {},
  onUnLoad: () => {}
});



export { SpinalContextDelete, extentionDeletePanel };
