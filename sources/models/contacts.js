import {url} from "../views/server/url";

const contactsCollection = new webix.DataCollection({
	url: url.urlContacts,
	save: `rest->${url.urlContacts}`
});
export default contactsCollection;
