import {
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';
import {
  ROOMS_CATEGORY_RELATION,
  ROOMS_TO_ELEMENT_RELATION,
  ROOMS_GROUP_RELATION,
  EQUIPMENTS_CATEGORY_RELATION,
  EQUIPMENTS_TO_ELEMENT_RELATION,
  EQUIPMENTS_GROUP_RELATION
} from 'spinal-env-viewer-room-manager/js/service'


const SELECTrelationList = ["hasGeographicSite", "hasGeographicBuilding",
  "hasGeographicFloor", "hasGeographicZone", "hasGeographicRoom",
  "hasBIMObject", "hasBimObject", ROOMS_CATEGORY_RELATION,
  ROOMS_TO_ELEMENT_RELATION,
  ROOMS_GROUP_RELATION,
  EQUIPMENTS_CATEGORY_RELATION,
  EQUIPMENTS_TO_ELEMENT_RELATION,
  EQUIPMENTS_GROUP_RELATION
]
const removeFromIsShown = ["SpinalService", "scene", "SpinalContext", "BimFile",
  "dashboardContext"
]


const utilities = {
  async sortBIMObjectByModel(arrayOfBIMObject) {
    let arrayModel = []
    //spinal.ForgeViewer.viewerManager.models
    // for (const key in spinal.ForgeViewer.viewerManager.models) {
    //   if (object.hasOwnProperty(key)) {
    //     const element = object[key];

    //   }
    // }
    for (const key in spinal.BimObjectService
        .mappingBimFileIdModelId) {
      if (spinal.BimObjectService
        .mappingBimFileIdModelId.hasOwnProperty(key)) {
        const element = spinal.BimObjectService
          .mappingBimFileIdModelId[key];
        let obj = {
          dbid: [],
          model: element
        }
        arrayModel.push(obj)
      }
    }



    for (let i = 0; i < arrayOfBIMObject.length; i++) {
      let boolPresent = false;
      let bim = SpinalGraphService.getNode(arrayOfBIMObject[i].info.id
        .get())
      // il faut prendre en compte l'ensemble des models
      let spinalModel = window.spinal.BimObjectService
        .mappingBimFileIdModelId[
          bim.bimFileId
          .get()]
      if (spinalModel) {
        // let obj = {
        //   dbid: [bim.dbid.get()],
        //   model: spinalModel
        // }
        for (let j = 0; j < arrayModel.length; j++) {
          const element = arrayModel[j];
          if (element.model.modelId === spinalModel.modelId) {
            element.dbid.push(bim.dbid.get())
            boolPresent = true;
          }
        }
        // if (boolPresent == false) {
        //   console.log("push obj", obj);
        //   arrayModel.push(obj)
        // }
      }
    }
    console.log(arrayModel);

    return arrayModel;
  }
}

module.exports = {
  SELECTrelationList,
  removeFromIsShown,
  utilities
};