import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "form",
			localId: "form",
			elements: [
				{
					view: "text",
					label: _("Name"),
					name: "Name",
					invalidMessage: _("Is not be empty")
				},
				{
					view: "text",
					label: _("Email"),
					name: "Email",
					invalidMessage: _("Write correct email")
				},
				{
					view: "combo",
					label: _("Status"),
					name: "Status",
					invalidMessage: _("Is not be empty"),
					options: {body: {data: statusesCollection, template: "#Name#"}}
				},
				{
					view: "combo",
					label: _("Country"),
					name: "Country",
					invalidMessage: _("Is not be empty"),
					options: {body: {data: countriesCollection, template: "#Name#"}}
				},
				{
					cols: [
						{
							view: "button",
							label: _("Save"),
							css: "webix_primary",
							click: () => this.saveClick()
						},
						{
							view: "button",
							label: _("Cancel"),
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
			contactsCollection.waitSave(() => {
				contactsCollection.add(values);
			}).then((result) => {
				values.id = result.id;
				this.app.callEvent("onAfterContactAdded", []);
			});
		}
		else {
			contactsCollection.updateItem(values.id, values);
		}
	}

	cancelClick() {
		this.form.clear();
		this.app.callEvent("onClearContactsForm", []);
	}

	urlChange() {
		this.form.clear();
	}
}
