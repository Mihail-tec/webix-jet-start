webix.protoUI({
	name: "autoform",
	$init(config) {
		config.elements = [];
		config.fields.forEach(item => config.elements.push({view: "text", label: item.label, name: item.name}));
		config.elements.push({view: "toolbar",
			css: "borderless",
			cols: [
				{view: "button", value: config.cancel, css: "webix_danger", click: config.actionCancel},
				{view: "button", value: config.save, css: "webix_primary", align: "right", click: () => config.actionSave(this.getValues(), this)}
			]}, {});
	}
}, webix.ui.form);
