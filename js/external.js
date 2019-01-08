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


 function search_node(node, bool, name) {
	let el = document.getElementsByClassName("node-name");
	let ite = 0;

	while (el[ite]) {
		if (el[ite].innerText === name) {
			sort_node(el[ite].parentElement.parentElement, bool);
			return;
		}
		ite++;
	}
 }

 function sort_node(target, bool) {
	let list = target;
	let ite = 2;
	let count = 0;
	let tmp = '';
	let index = 0;
	let myNode = [];
	let arrName = [];
	let lastValue = '';
	let echange;
	target = target.childNodes;

	try {

		while(target[ite]) {
			myNode.push(target[ite]);
			tmp = target[ite].innerText.replace(/\n[\w\W\d]*/gi, '');
			if (tmp == 'keyboard_arrow_right')
				tmp = target[ite].querySelectorAll("div")[2].innerText;
			arrName.push(tmp);
			ite++;
		}
	} catch(error) {
		return ;
	}
	ite = 2;

	while (arrName[ite - 2]) {

		lastValue = arrName[ite - 2];
		while(arrName[count]) {

			if (bool) {
				if (lastValue < arrName[count]) {
					index = count;
				}
			} else {
				if (lastValue > arrName[count]) {
					index = count;
			}
		}

		count++;
		}

		if (index != -1) {
			echange = arrName[ite - 2];
			arrName[ite - 2] = arrName[index];
			arrName[index] = echange;

			echange = myNode[ite - 2];
			myNode[ite-2] = myNode[index];
			myNode[index] = echange;

		}

		index = -1;
		ite++;
		count = (ite - 2);
	}
	for (var k in myNode)
		list.appendChild(myNode[k]);
 }

function removeElement(node) {
	node.removeFromGraph();
}

 export { search_node, removeElement };
