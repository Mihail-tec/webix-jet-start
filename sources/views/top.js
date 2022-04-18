import {JetView} from "webix-jet";

import Menu from "./menu";


export default class TopView extends JetView {
	config() {
		const header = {
			type: "header", template: "First App", css: "webix_header app_header"
		};

		const ui = {
			type: "clean",
			paddingX: 5,
			css: "app_layout",
			cols: [
				{paddingX: 5, paddingY: 10, rows: [{css: "webix_shadow_medium", rows: [header, Menu]}]},
				{type: "wide",
					paddingY: 10,
					paddingX: 5,
					rows: [
						{$subview: true}
					]}
			]
		};

		return ui;
	}
}
