import {JetView} from "webix-jet";

import ContactsForm from "./contacts/form";
import ContactsList from "./contacts/list";

export default class ContactsView extends JetView {
	config() {
		const list = ContactsList;
		const form = ContactsForm;
		return {cols: [list, form]};
	}
}
