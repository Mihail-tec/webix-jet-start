import {JetView} from "webix-jet";

import countriesCollection from "../models/countries";
import statusesCollection from "../models/statuses";
import DataTableView from "./components/datatable";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const countries = _("Countries");
		const statuses = _("Statuses");
		const name = _("Name");
		const icon = _("Icon");
		const tabbar = {
			view: "tabbar",
			options: [
				{id: "countries", value: countries},
				{id: "statuses", value: statuses}
			],
			on: {
				onChange: id => this.$$(id).show()
			}
		};

		const colsCountries = [
			{id: "Name", header: name, fillspace: true},
			{template: "{common.trashIcon()}"}
		];

		const rulesCountries = {
			Name: webix.rules.isNotEmpty
		};

		const colsStatuses = [
			{id: "Name", header: name, fillspace: true},
			{id: "Icon", header: icon},
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
