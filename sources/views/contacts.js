import {JetView} from "webix-jet";

import {contacts} from "../models/contacts";

export default class ContactsView extends JetView {
	config() {
		const list = {
			view: "list",
			localId: "contactsList",
			template: "Name:#Name#, Email:#Email#, Country:#Country#, Status:#Status#",
			select: true
		};

		const form = {
			view: "form",
			localId: "contactsForm",
			width: 400,
			elements: [
				{view: "text", label: "Name", name: "Name"},
				{view: "text", label: "Email", name: "Email"},
				{view: "text", label: "Country", name: "Country"},
				{view: "text", label: "Status", name: "Status"},
				{
					cols: [
						{view: "button", value: "Save", css: "webix_primary", click: () => this.save()},
						{view: "button", value: "Clear", css: "webix_danger", click: () => this.clear()}
					]
				}

			]
		};

		return {cols: [list, form]};
	}

	init() {
		this.$$("contactsList").parse(contacts);
		this.$$("contactsForm").bind(this.$$("contactsList"));
	}

	save() {
		webix.message("form save");
		this.$$("contactsForm").clear();
	}

	clear() {
		webix.confirm({text: "Are you sure?"}).then(() => {
			this.$$("contactsForm").clear();
		});
	}
}
