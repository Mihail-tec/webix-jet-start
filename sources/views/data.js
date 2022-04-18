import { JetView } from "webix-jet";
import DataTableView from "./components/datatable";
import { countries } from "../models/countries.js";
import { statuses } from "../models/statuses.js";

export default class DataView extends JetView {

	config() {
		const tabbar = {
			view:"tabbar",
			options:[
				{ id:"countries", value:"Countries" },
				{ id:"statuses", value:"Statuses" },
			],
			on:{
				onChange:function(nextId) {
					this.$scope.$$(nextId).show();
				}
			}
		};	

		const colsCountries = [
			{ id:"Name", header:"Name", fillspace:true },
			{ template:"{common.trashIcon()}" },
		];

		const rulesCountries = {
			"Name": webix.rules.isNotEmpty,
		};

		const colsStatuses = [
			{ id:"Name", header:"Name", fillspace:true },
			{ id:"Icon", header:"Icon" },
			{  template:"{common.trashIcon()}" },
		];

		const rulesStatuses = {
			"Name": webix.rules.isNotEmpty,
			"Icon": webix.rules.isNotEmpty,
		};

		const countriesCollection = new webix.DataCollection({
			url() {
				const promisedData = webix.promise.defer();
				promisedData.resolve(
					countries
				);
				return promisedData;
			}
		});

		const statusesCollection = new webix.DataCollection({
			url() {
				const promisedData = webix.promise.defer();
				promisedData.resolve(statuses);
				return promisedData;
			}
		});


		return {
			localId:"cells_data",
			rows:[
				tabbar,
				{ cells:[
					{ id:"countries", rows:[new DataTableView(this.app, countriesCollection, colsCountries, rulesCountries)] },
					{ id:"statuses", rows:[new DataTableView(this.app, statusesCollection, colsStatuses, rulesStatuses)] },
				]},
			]
		};
	}
}