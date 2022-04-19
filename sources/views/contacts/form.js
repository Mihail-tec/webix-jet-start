import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const name = _("Name");
		const email = _("Email");
		const status = _("Status");
		const country = _("Country");
		const save = _("Save");
		const cancel = _("Cancel");
		const notEmpty = _("Is not be empty");
		const correctEmail = _("Write correct email");

		return {
			view: "form",
			localId: "form",
			elements: [
				{
					view: "text",
					label: name,
					name: "Name",
					invalidMessage: notEmpty
				},
				{
					view: "text",
					label: email,
					name: "Email",
					invalidMessage: correctEmail
				},
				{
					view: "combo",
					label: status,
					name: "Status",
					invalidMessage: notEmpty,
					options: {body: {data: statusesCollection, template: "#Name#"}}
				},
				{
					view: "combo",
					label: country,
					name: "Country",
					invalidMessage: notEmpty,
					options: {body: {data: countriesCollection, template: "#Name#"}}
				},
				{
					cols: [
						{
							view: "button",
							label: save,
							css: "webix_primary",
							click: () => this.saveClick()
						},
						{
							view: "button",
							label: cancel,
							css: "webix_danger",
							click: () => this.cancelClick()
						}
					]
				},
				{}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail,
				Status: webix.rules.isNotEmpty,
				Country: webix.rules.isNotEmpty
			}
		};
	}

	init() {
		this.form = this.$$("form");
		this.on(this.app, "onContactItemSelected", (item) => {
			this.form.clearValidation();
			this.form.setValues(item);
		});
		this.on(this.app, "onAfterContactDeleted", () => this.form.clear());
	}

	saveClick() {
		if (!this.form.validate()) {
			return;
		}
		const values = this.form.getValues();
		if (!contactsCollection.exists(values.id)) {
			contactsCollection.add(values);
			this.form.clear();
			this.app.callEvent("onAfterContactAdded", []);
		}
		else {
			contactsCollection.updateItem(values.id, values);
		}
	}

	cancelClick() {
		this.form.clear();
		this.app.callEvent("onClearContactsForm", []);
	}
}
