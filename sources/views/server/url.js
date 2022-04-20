export const host = "http://localhost:8096";

export const url = {
	urlCountries:	`${host}/api/v1/countries/`,
	urlStatuses:	`${host}/api/v1/statuses/`,
	urlContacts:	`${host}/api/v1/contacts/`,
	pathCountries:	"/api/v1/countries/",
	pathCtatuses:	"/api/v1/statuses/",
	pathContacts:	"/api/v1/contacts/"
};


export function showError(err = "Request error.") {
	return () => {
		webix.message({
			text: err,
			type: "error"
		});
	};
}
