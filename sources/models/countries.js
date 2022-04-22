import {url} from "../views/server/url";

const countriesCollection = new webix.DataCollection({
	url: url.urlCountries,
	save: `rest->${url.urlCountries}`
});

export default countriesCollection;
