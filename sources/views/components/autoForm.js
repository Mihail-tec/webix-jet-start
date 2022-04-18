webix.protoUI({
	name:"autoform",
	$init:function(config) {
		config.elements = [];
		config.fields.map(el => {
			config.elements.push({ view:"text", label:el, name:el, invalidMessage: "Is not be empty" });
		});
		config.elements.push({view:"toolbar", css:"borderless", cols: [
			{ view:"button", value:"Cancel", css: "webix_danger", click: config.actionCancel },
			{ view:"button", value:"Save", css:"webix_primary", align:"right",  click:() => config.actionSave(this.getValues()) },
		]});
	},
}, webix.ui.form);