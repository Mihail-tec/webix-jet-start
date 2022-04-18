const statuses = [
	{id: 1, Name: "Busy", Icon: "cogs"},
	{id: 2, Name: "Open", Icon: "user"}
];

const statusesCollection = new webix.DataCollection({
	url() {
		const promisedData = webix.promise.resolve(statuses);
		return promisedData;
	}
});
export default statusesCollection;
