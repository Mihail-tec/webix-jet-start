webix.protoUI({
	name: "autoform",
	$init(config) {
		const _ = this.$scope.app.getService("locale")._;
		const save = _("Save");
		const cancel = _("Cancel");
		config.elements = [];
		config.fields.map(el => config.elements.push({view: "text", label: _(el), name: el, invalidMessage: "Is not be empty"}));
		config.elements.push({view: "toolbar",
			css: "borderless",
			cols: [
				{view: "button", value: cancel, css: "webix_danger", click: config.actionCancel},
				{view: "button", value: save, css: "webix_primary", align: "right", click: () => config.actionSave(this.getValues(), this)}
			]}, {});
	}
}, webix.ui.form);
