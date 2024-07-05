/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
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

import { SpinalGraphService } from "spinal-env-viewer-graph-service";
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

import { groupManagerService } from "spinal-env-viewer-plugin-group-manager-service";

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
  REFERENCE_RELATION,
} from "spinal-env-viewer-context-geographic-service/build/constants";

import { SpinalBmsEndpoint } from "spinal-model-bmsnetwork";

import { CONSTANTS } from "spinal-env-viewer-plugin-network-tree-service";


const SELECTrelationList = [
  SITE_RELATION,
  BUILDING_RELATION,
  FLOOR_RELATION,
  ZONE_RELATION,
  ROOM_RELATION,
  EQUIPMENT_RELATION,
  REFERENCE_RELATION,
  `${REFERENCE_RELATION}.ROOM`,
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
  `groupHas${SpinalBmsEndpoint.nodeTypeName}`,
  // CONSTANTS.NETWORK_RELATION,
  // CONSTANTS.NETWORK_BIMOJECT_RELATION
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
  `${ZONE_TYPE}GroupContext`,
  // CONSTANTS.CONTEXT_TYPE,
  // CONSTANTS.NETWORK_TYPE,
];

const utilities = {
  async sortBIMObjectByModel(arrayOfBIMObject) {
    let arrayModel = [];
    for (const key in spinal.BimObjectService.mappingBimFileIdModelId) {
      if (spinal.BimObjectService.mappingBimFileIdModelId.hasOwnProperty(key)) {
        const element = spinal.BimObjectService.mappingBimFileIdModelId[key];
        let obj = {
          dbid: [],
          model: element,
        };
        arrayModel.push(obj);
      }
    }
    for (let i = 0; i < arrayOfBIMObject.length; i++) {
      SpinalGraphService._addNode(arrayOfBIMObject[i]);
      let bim = SpinalGraphService.getNode(arrayOfBIMObject[i].info.id.get());
      try {
        let spinalModel =
          window.spinal.BimObjectService.mappingBimFileIdModelId[
          bim.bimFileId.get()
          ];
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
  },
  organizeBimObjectForAggregateViewer(bimObjects, name_of_key) {
    const aggregate = bimObjects.reduce((res, el) => {
      if (el.dbid && el.dbid.length > 0) {
        for (const { model } of el.model.modelScene) {
          let found = false;
          for (const item of res) {
            if (item.model === model) {
              item[name_of_key].push(...el.dbid);
              found = true;
            }
          }
          if (!found) {
            res.push({
              model,
              [name_of_key]: Array.from(el.dbid)
            });
          }
        }
      }
      return res;
    }, []);
    return aggregate;
  },

};

module.exports = {
  SELECTrelationList,
  isShownParam,
  utilities,
};
