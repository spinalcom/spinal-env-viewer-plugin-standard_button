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
import { assemblyManagerService } from "spinal-service-assembly-manager";

const {
  SpinalContextApp
} = require( "spinal-env-viewer-context-menu-service" );


class SpinalContextIsolation extends SpinalContextApp {
  constructor() {
    super( "isolation button", "zoom button", {
      icon: "settings_overscan",
      icon_type: "in"
    } );
  }
  
  isShown() {
    //  if (option.selectedNode instanceof spinalgraph.SpinalContext)
    return (Promise.resolve( true ));
    //    else
    //      return (-1);
  }
  
  action( option ) {
    this.viewer = window.spinal.ForgeViewer.viewer;
    this.assemblyManager = assemblyManagerService;
  
    let self = this;
    if (this.viewer.getIsolatedNodes().length === 0) {
      let realNode = SpinalGraphService.getRealNode( option.selectedNode.id.get() );
      realNode.find( [
          "hasGeographicSite", "hasGeographicBuilding",
          "hasGeographicFloor", "hasGeographicZone",
          "hasGeographicRoom", "hasBIMObject"
        ],
        function ( node ) { if (node.info.type.get() === "BIMObject") return true; }
      ).then( lst => {
        let result = lst.map( x => x.info.dbid.get() );
        self.viewer.select( result, self.assemblyManager._getCurrentModel() );
        let aggregateSelection = self.viewer.getAggregateSelection();
        
        if (aggregateSelection.length > 0) {
          for (let i = 0; i < aggregateSelection.length; i++) {
            self.viewer.isolate( aggregateSelection[i].selection, aggregateSelection[i].model );
          }
        } else {
          self.viewer.isolate( 0 );
        }
      } );
    } else {
      self.viewer.clearSelection();
      self.viewer.isolate( 0 );
    }
  }
}

export { SpinalContextIsolation };
