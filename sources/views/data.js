import {JetView} from "webix-jet";

import countriesCollection from "../models/countries";
import statusesCollection from "../models/statuses";
import DataTableView from "./components/datatable";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const tabbar = {
			view: "tabbar",
			options: [
				{id: "countries", value: _("Countries")},
				{id: "statuses", value: _("Statuses")}
			],
			on: {
				onChange: id => this.$$(id).show()
			}
		};

		const colsCountries = [
			{id: "Name", header: _("Name"), fillspace: true},
			{template: "{common.trashIcon()}"}
		];

		const rulesCountries = {
			Name: webix.rules.isNotEmpty
		};

		const colsStatuses = [
			{id: "Name", header: _("Name"), fillspace: true},
			{id: "Icon", header: _("Icon")},
			{template: "{common.trashIcon()}"}
		];

		const rulesStatuses = {
			Name: webix.rules.isNotEmpty,
			Icon: webix.rules.isNotEmpty
		};

		return {
			localId: "cells_data",
			rows: [
				tabbar,
				{cells: [
					{id: "countries", rows: [new DataTableView(this.app, countriesCollection, colsCountries, rulesCountries)]},
					{id: "statuses", rows: [new DataTableView(this.app, statusesCollection, colsStatuses, rulesStatuses)]}
				]}
			]
		};
	}
}
