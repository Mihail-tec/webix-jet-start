import {JetView, plugins} from "webix-jet";

export default class Menu extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{value: _("Contacts"), id: "contacts", icon: "wxi-columns", href: "/#!/top/contacts"},
				{value: _("Data"),	id: "data", icon: "wxi-pencil", href: "/#!/top/data"},
				{value: _("Settings"), id: "settings", icon: "wxi-dots", href: "/#!/top/settings"}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
