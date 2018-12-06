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
const spinalgraph = require("spinalgraph");

const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");


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
      return (true);
//    else
//      return (-1);
  }

  action(option) {
    console.log(option);
    search_node(option.selectedNode, this.sorted, option.selectedNode.info.name.get());
    this.sorted = !this.sorted;
  }
}

function search_node(node, bool, name) {
   let el = document.getElementsByClassName("node-name");
   let ite = 0;
   let arrName = []


   while (el[ite]) {
    if (el[ite].innerText === name) {
      //console.log("success");
      //console.log(el[ite].parentElement.parentElement);
      //console.log(el[ite].parentElement.parentElement.childNodes);
     // el[ite].parentElement.parentElement.appendChild(el[ite].parentElement.parentElement.childNodes[4]);
      sort_node(el[ite].parentElement.parentElement);
      return;
      // el[ite].parentElement.parentElement.replaceChild(el[ite].parentElement.parentElement.childNodes[4], el[ite].parentElement.parentElement.childNodes[5]);
    }
    ite++;
   }

   if (!bool)
      console.log("a-z");
   else
     console.log("z-a");
}

function sort_node(target) {
  let list = target;
  let ite = 2;
  let count = 0;
  let index = 0;
  let arrName = [];
  console.log("------------------------");
  target = target.childNodes;
  console.log(target);
  while(target[ite]) {
  console.log(target[ite].children);
  arrName.push(target[ite].innerText.replace(/\n[\w\W\d]*/gi, ''));
    ite++;
  }
  ite = 2;
  let echange;
  console.log("----------end------------------");
  console.log("arrName = ", arrName);
  console.log("target = ",target);


  let result = [];

  while (arrName[ite - 2]) {
    console.log(arrName[ite - 2]);
    while(arrName[count]) {
      if (arrName[count] < arrName[ite - 2]) {
        console.log(arrName[ite-2],"<",arrName[count])
        echange = arrName[ite - 2];
        arrName[ite - 2] = arrName[count];
        arrName[count] = echange;

      //  echange = target[ite];
      //  target[ite] = target[count+2]
      //  target[count+2] = echange;



        //echange = arrName[ite - 2];
        //arrName[ite - 2] = arrName[count];
        //arrName[count] = echange;
      }
      count++;
    }
    count = 0;
    ite++;
  }
  console.log(arrName);
  console.log(result);


































/*
let newArr = [];
  while (arrName[ite-2]) {
    while(arrName[count]) {
      console.log(arrName[count], arrName[ite-2]);
      console.log(arrName[count] < arrName[ite-2]);
      console.log(target);
      console.log(arrName);
      console.log("--------------");
      if (arrName[count] < arrName[ite-2]) {
  


        newArr[ite-2] = target[count + 2];
        //console.log(arrName[count]);
        echange = arrName[ite-2];
        arrName[ite-2] = arrName[count];
        arrName[count] = echange;
        //target[1].insertBefore(target[2], );
       // list.appendChild(target[count + 2]);
        //index = count;


      }
      count++;
      target.
      //target = list.childNodes;
    }
    count = 0;
    ite++;
  }*/


  //console.log("end");
 // console.log(newArr);
  //target.
 // console.log(arrName);
 //console.log(target);
 //target.appendChild(newArr);
}

export { SpinalContextSortByName };