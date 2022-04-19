import {JetView, plugins} from "webix-jet";

export default class Menu extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const Contacts = _("Contacts");
		const Settings = _("Settings");
		const Data = _("Data");
		return {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{value: Contacts, id: "contacts", icon: "wxi-columns", href: "/#!/top/contacts"},
				{value: Data,	id: "data", icon: "wxi-pencil", href: "/#!/top/data"},
				{value: Settings, id: "settings", icon: "wxi-dots", href: "/#!/top/settings"}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
