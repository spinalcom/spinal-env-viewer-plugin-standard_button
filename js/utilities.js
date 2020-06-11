import {
  SpinalGraphService
} from 'spinal-env-viewer-graph-service';
// import {
//   // ROOMS_CATEGORY_RELATION,
//   // ROOMS_TO_ELEMENT_RELATION,
//   // ROOMS_GROUP_RELATION,
//   // EQUIPMENTS_CATEGORY_RELATION,
//   // EQUIPMENTS_TO_ELEMENT_RELATION,
//   // EQUIPMENTS_GROUP_RELATION,
//   // ROOMS_GROUP_CONTEXT,
//   // ROOMS_GROUP,
//   // ROOMS_CATEGORY,
//   // EQUIPMENTS_GROUP_CONTEXT,
//   // EQUIPMENTS_CATEGORY,
//   // EQUIPMENTS_GROUP

//   groupService

// } from 'spinal-env-viewer-room-manager/services/service';

import {
  groupManagerService
} from "spinal-env-viewer-plugin-group-manager-service";

import {
  SITE_TYPE,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ZONE_TYPE,
  ROOM_TYPE,
  EQUIPMENT_TYPE,
  SITE_RELATION,
  BUILDING_RELATION,
  FLOOR_RELATION,
  ZONE_RELATION,
  ROOM_RELATION,
  EQUIPMENT_RELATION,
  REFERENCE_RELATION
} from 'spinal-env-viewer-context-geographic-service/build/constants';

import {
  SpinalBmsEndpoint
} from 'spinal-model-bmsnetwork';

const SELECTrelationList = [
  SITE_RELATION,
  BUILDING_RELATION,
  FLOOR_RELATION,
  ZONE_RELATION,
  ROOM_RELATION,
  EQUIPMENT_RELATION,
  REFERENCE_RELATION,
  "hasBIMObject", // for old system
  // groupService.constants.CONTEXT_TO_CATEGORY_RELATION,
  // groupService.constants.CATEGORY_TO_GROUP_RELATION,
  // groupService.constants.GROUP_TO_ROOMS_RELATION,
  // groupService.constants.GROUP_TO_EQUIPMENTS_RELATION,
  // groupService.constants.GROUP_TO_ENDPOINT_RELATION,
  groupManagerService.constants.CONTEXT_TO_CATEGORY_RELATION,
  groupManagerService.constants.CATEGORY_TO_GROUP_RELATION,
  ...Object.values(groupManagerService.constants.OLD_RELATIONS_TYPES),
  `groupHas${ROOM_TYPE}`,
  `groupHas${EQUIPMENT_TYPE}`,
  `groupHas${SITE_TYPE}`,
  `groupHas${BUILDING_TYPE}`,
  `groupHas${FLOOR_TYPE}`,
  `groupHas${ZONE_TYPE}`,
  `groupHas${SpinalBmsEndpoint.nodeTypeName}`
];

const isShownParam = [
  SITE_TYPE,
  BUILDING_TYPE,
  FLOOR_TYPE,
  ZONE_TYPE,
  ROOM_TYPE,
  EQUIPMENT_TYPE,
  // ...groupService.constants.CONTEXTS_TYPES,
  // ...groupService.constants.GROUPS_TYPES,
  // groupService.constants.CATEGORY_TYPE
  ...Object.values(groupManagerService.constants.OLD_CONTEXTS_TYPES),
  ...Object.values(groupManagerService.constants.OLD_GROUPS_TYPES),
  groupManagerService.constants.CATEGORY_TYPE,
  `${ROOM_TYPE}Group`,
  `${EQUIPMENT_TYPE}Group`,
  `${SITE_TYPE}Group`,
  `${BUILDING_TYPE}Group`,
  `${FLOOR_TYPE}Group`,
  `${ZONE_TYPE}Group`,
  `${ROOM_TYPE}GroupContext`,
  `${EQUIPMENT_TYPE}GroupContext`,
  `${SITE_TYPE}GroupContext`,
  `${BUILDING_TYPE}GroupContext`,
  `${FLOOR_TYPE}GroupContext`,
  `${ZONE_TYPE}GroupContext`
];

const utilities = {
  async sortBIMObjectByModel(arrayOfBIMObject) {
    let arrayModel = [];
    for (const key in spinal.BimObjectService
        .mappingBimFileIdModelId) {
      if (spinal.BimObjectService
        .mappingBimFileIdModelId.hasOwnProperty(key)) {
        const element = spinal.BimObjectService
          .mappingBimFileIdModelId[key];
        let obj = {
          dbid: [],
          model: element
        };
        arrayModel.push(obj);
      }
    }
    for (let i = 0; i < arrayOfBIMObject.length; i++) {
      SpinalGraphService._addNode(arrayOfBIMObject[i]);
      let bim = SpinalGraphService.getNode(arrayOfBIMObject[i].info.id
        .get());
      try {
        let spinalModel = window.spinal.BimObjectService
          .mappingBimFileIdModelId[
            bim.bimFileId
            .get()];
        if (spinalModel) {
          for (let j = 0; j < arrayModel.length; j++) {
            const element = arrayModel[j];
            if (element.model.modelId === spinalModel.modelId) {
              element.dbid.push(bim.dbid.get());
            }
          }
        }

      } catch (error) {
        console.error("skip node because bimFileId is not defined", error);
      }
    }
    return arrayModel;
  }
};

module.exports = {
  SELECTrelationList,
  isShownParam,
  utilities
};