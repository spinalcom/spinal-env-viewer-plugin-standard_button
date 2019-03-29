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

class SpinalContextFitToViewer extends SpinalContextApp {
  constructor() {
    super("fit button", "fit to viewer button", {
      icon: "zoom_in",
      icon_type: "in"
    });
  }

  isShown() {
  //  if (option.selectedNode instanceof spinalgraph.SpinalContext)
      return (Promise.resolve(true));
//    else
//      return (-1);
  }

  action(option) {
    window.spinal.ForgeViewer.viewer.impl.showGhosting = false;
    this.viewer = window.spinal.ForgeViewer.viewer
    let self = this;
    let realNode = SpinalGraphService.getRealNode(option.selectedNode.id.get());
    this.viewer = window.spinal.ForgeViewer.viewer
    realNode.find(["hasGeographicSite", "hasGeographicBuilding", "hasGeographicFloor", "hasGeographicZone", "hasGeographicRoom", "hasBIMObject"],
      function(node) { if (node.info.type.get() === "BIMObject") return true; }).then(lst => {
        let result = lst.map(x => x.info.dbid.get());
        self.viewer.select(result);

      let selection = this.viewer.getSelection();
      if (selection.length > 0) {
        self.viewer.fitToView(selection);
      }
      else {
          self.viewer.fitToView(0);
      }
      });
  }
}


export { SpinalContextFitToViewer };
