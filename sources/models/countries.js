const countries = [
	{id: 1, Name: "USA"},
	{id: 2, Name: "Canada"},
	{id: 3, Name: "Italy"}
];

const countriesCollection = new webix.DataCollection({
	url() {
		const promisedData = webix.promise.resolve(countries);
		return promisedData;
	}
});
export default countriesCollection;
