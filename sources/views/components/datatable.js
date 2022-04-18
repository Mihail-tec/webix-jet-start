import {JetView} from "webix-jet";
import "./autoForm";

export default class DataTableView extends JetView {
	constructor(app, data, columns, rules) {
		super(app);

		this.dataItems = data;
		this.columns = columns;
		this.rules = rules;
	}

	config() {
		return this.dataItems.waitData.then(() => {
			const data = this.dataItems;
			const obj = data.getItem(data.getFirstId());
			const fields = Object.keys(obj).filter(key => key !== "id");

			const table = {
				localId: "table",
				view: "datatable",
				columns: this.columns,
				select: true,
				height: 500,
				onClick: {
					"wxi-trash": function (e, id) {
						webix.confirm("Are you sure?").then(() => {
							data.remove(id);
							this.$scope.$$("form").clear();
							return false;
						});
					}
				},
				on: {
					onAfterSelect(item) {
						const form = this.$scope.$$("form");
						form.setValues(data.getItem(item.id));
					}
				}
			};

			const thisScope = this;
			const form = {
				localId: "form",
				view: "autoform",
				fields,
				actionSave(values) {
					const formInf = thisScope.$$("form");
					if (formInf.validate()) {
						if (data.exists(values.id)) {
							data.updateItem(values.id, values);
						}
						else {
							data.add(values);
						}
						formInf.clear();
						thisScope.$$("table").clearSelection();
					}
				},
				actionCancel() {
					this.$scope.$$("form").clear();
					this.$scope.$$("table").clearSelection();
				},
				rules: this.rules
			};


			return {
				cols: [
					table,
					form
				]
			};
		});
	}

	init() {
		this.$$("table").parse(this.dataItems);
	}
}
