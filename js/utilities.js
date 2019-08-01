import {
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';
import {
  ROOMS_CATEGORY_RELATION,
  ROOMS_TO_ELEMENT_RELATION,
  ROOMS_GROUP_RELATION,
  EQUIPMENTS_CATEGORY_RELATION,
  EQUIPMENTS_TO_ELEMENT_RELATION,
  EQUIPMENTS_GROUP_RELATION,
  ROOMS_GROUP_CONTEXT,
  ROOMS_GROUP,
  ROOMS_CATEGORY,
  EQUIPMENTS_GROUP_CONTEXT,
  EQUIPMENTS_CATEGORY,
  EQUIPMENTS_GROUP
} from 'spinal-env-viewer-room-manager/js/service'
import {
  SITE_TYPE,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ZONE_TYPE,
  ROOM_TYPE,
  EQUIPMENT_TYPE
} from 'spinal-env-viewer-context-geographic-service/build/constants'

const SELECTrelationList = ["hasGeographicSite", "hasGeographicBuilding",
  "hasGeographicFloor", "hasGeographicZone", "hasGeographicRoom",
  "hasBIMObject", "hasBimObject", ROOMS_CATEGORY_RELATION,
  ROOMS_TO_ELEMENT_RELATION,
  ROOMS_GROUP_RELATION,
  EQUIPMENTS_CATEGORY_RELATION,
  EQUIPMENTS_TO_ELEMENT_RELATION,
  EQUIPMENTS_GROUP_RELATION
]



const isShownParam = [
  SITE_TYPE,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ZONE_TYPE,
  ROOM_TYPE,
  EQUIPMENT_TYPE,
  ROOMS_GROUP_CONTEXT,
  ROOMS_GROUP,
  ROOMS_CATEGORY,
  EQUIPMENTS_GROUP_CONTEXT,
  EQUIPMENTS_CATEGORY,
  EQUIPMENTS_GROUP
]


const utilities = {
  async sortBIMObjectByModel(arrayOfBIMObject) {
    let arrayModel = []
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
      let bim = SpinalGraphService.getNode(arrayOfBIMObject[i].info.id
        .get())
         try {
        let spinalModel = window.spinal.BimObjectService
          .mappingBimFileIdModelId[
          bim.bimFileId
            .get()]
        if (spinalModel) {
          for (let j = 0; j < arrayModel.length; j++) {
            const element = arrayModel[j];
            if (element.model.modelId === spinalModel.modelId) {
              element.dbid.push(bim.dbid.get())
            }
          }
        }

      } catch (error) {
        console.error("skip node because bimFileId is not defined", error)
      }
    }
    return arrayModel;
  }
}

module.exports = {
  SELECTrelationList,
  isShownParam,
  utilities
};
