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
	spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");
const spinalgraph = require("spinal-model-graph");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");



				/* 			Delete Button  				*/
import { SpinalContextDelete, extentionDeletePanel } from './js/deleteButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextDelete());
SpinalForgeExtention.registerExtention("deletePanel", extentionDeletePanel);


				/* 			Rename Button  				*/
import { SpinalContextRename, extentionRenamePanel } from './js/renameButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextRename());
SpinalForgeExtention.registerExtention("renamePanel", extentionRenamePanel);


				/* 			Zoom Button  				*/
import { SpinalContextFitToViewer, extentionFitPanel } from './js/fitToViewerButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextFitToViewer());
SpinalForgeExtention.registerExtention("fitPanel", extentionFitPanel);


				/* 			Isolation Button  			*/
import { SpinalContextIsolation } from './js/isolationButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextIsolation());


				/* 			Research Button				*/
import { SpinalContexResearch, extentionResearchPanel } from './js/researchButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContexResearch());
SpinalForgeExtention.registerExtention("searchPanel", extentionResearchPanel);


				/* 			SortChild Button			*/
import { SpinalContextSortByName } from './js/sortButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextSortByName());


				/* 			SelectBIMObject Button 		*/
import { SpinalContextSelectBIMObject } from './js/selectBIMObjectButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextSelectBIMObject());
