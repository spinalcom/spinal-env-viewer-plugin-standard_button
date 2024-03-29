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

import "./registerDialogs";

const {
	spinalContextMenuService
} = require("spinal-env-viewer-context-menu-service");


/* 			Delete Button  				*/
import { SpinalContextDelete } from './js/deleteButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextDelete(), [3]);


/* 			Rename Button  				*/
import { SpinalContextRename } from './js/renameButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextRename(), [3]);


/* 			SortChild Button			*/
//import { SpinalContextSortByName } from './js/sortButton.js';

//spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextSortByName());


/* 			SelectBIMObject Button 		*/
import { SpinalContextSelectBIMObject } from './js/selectBIMObjectButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextSelectBIMObject(), [31]);


/* 			Zoom Button  				*/
import { SpinalContextFitToViewer } from './js/fitToViewerButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextFitToViewer(), [31]);


// 				/* 			Isolation Button  			*/
import { SpinalContextIsolation } from './js/isolationButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextIsolation(), [31]);

// 				/* 			Isolation Reference Button  			*/

import { SpinalContextIsolationReference } from './js/isolationReferenceButton.js';

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextIsolationReference(), [31]);


// 				/* 			Research Button				*/
//import { SpinalContexResearch } from './js/researchButton.js';

//spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContexResearch());

import { SpinalEditColor } from "./js/addColor";
spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalEditColor(), [3]);
