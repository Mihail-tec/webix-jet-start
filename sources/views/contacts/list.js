import {JetView} from "webix-jet";

import contactsCollection from "../../models/contacts";
import countriesCollection from "../../models/countries";
import statusesCollection from "../../models/statuses";

export default class ContactsList extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const name = _("Name");
		const email = _("Email");
		const countryName = _("Country");
		const statusName = _("Status");
		return contactsCollection.waitData.then(() => ({
			view: "list",
			localId: "list",
			template(obj) {
				const country = countriesCollection.getItem(obj.Country);
				const status = statusesCollection.getItem(obj.Status);
				return 	`${name}: ${obj.Name}, ${email}: ${obj.Email}, 
				${countryName}: ${country.Name}, ${statusName}: ${status.Name} <span class='webix_icon wxi-trash' style="float:right"></span>`;
			},
			onClick: {
				"wxi-trash": (e, id) => {
					webix.confirm(_("Are you sure?")).then(() => {
						contactsCollection.remove(id);
						this.$$("list").unselectAll();
						this.app.show("top/contacts");
						this.app.callEvent("onAfterContactDeleted", []);
						return false;
					});
				}
			},
			type: {
				height: 80
			},
			select: true,
			on: {
				onAfterSelect: (id) => {
					this.setParam("id", id, true);
					this.app.callEvent("onContactItemSelected", [contactsCollection.getItem(id)]);
				}
			}
		}));
	}

	init(view) {
		const list = this.$$("list");
		list.parse(contactsCollection);
		const id = this.getParam("id");
		if (!id || !contactsCollection.exists(id)) {
			view.select(view.data.getFirstId(), false);
		}
		else {
			view.select(id, false);
		}
		this.on(this.app, "onClearContactsForm", () => {
			list.unselectAll();
		});
		this.on(this.app, "onAfterContactAdded", () => {
			const lastId = contactsCollection.getLastId();
			view.$scope.app.show(`top/contacts?id=${lastId}`);
			list.select(lastId);
		});
	}
}
