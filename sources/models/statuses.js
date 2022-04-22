import {url} from "../views/server/url";

const statusesCollection = new webix.DataCollection({
	url: url.urlStatuses,
	save: `rest->${url.urlStatuses}`
});
export default statusesCollection;
