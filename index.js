const {
	spinalContextMenuService,
	SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");
const spinalgraph = require("spinalgraph");

class SpinalContextDelete extends SpinalContextApp {
	constructor() {
		super("Delete context button", "delete context", {
			icon: "delete",
			icon_type: "in"
		});
	}

	isShown(option) {
			return (true);
	}

	action(option) {
    option.selectedNode.removeFromGraph();
	}
}

spinalContextMenuService.registerApp("GraphManagerSideBar", new SpinalContextDelete());

