import {JetView} from "webix-jet";

import "./autoForm";
import {showError} from "../server/url";

export default class DataTableView extends JetView {
	constructor(app, data, columns, rules) {
		super(app);

		this.dataItems = data;
		this.columns = columns;
		this.rules = rules;
	}

	config() {
		const _ = this.app.getService("locale")._;
		return this.dataItems.waitData.then(() => {
			const data = this.dataItems;

			const fields = this.columns
				.filter(x => x.id).map(x => x.id)
				.map(x => ({name: x, label: _(x)}));

			const save = _("Save");
			const cancel = _("Cancel");
			const notEmpty = _("Is not be empty");
			const table = {
				localId: "table",
				view: "datatable",
				columns: this.columns,
				select: true,
				onClick: {
					"wxi-trash": (e, id) => {
						webix.confirm({
							title: _("Are you sure?"),
							ok: _("ok"),
							cancel: _("Cancel")
						}).then(() => {
							data.remove(id);
							this.form.clear();
							return false;
						});
					}
				},
				on: {
					onAfterSelect: (item) => {
						this.form.setValues(data.getItem(item.id));
					}
				}
			};

			const form = {
				localId: "form",
				view: "autoform",
				fields,
				save,
				cancel,
				notEmpty,
				actionSave: (values) => {
					if (this.form.validate()) {
						if (data.exists(values.id)) {
							data.updateItem(values.id, values);
						}
						else {
							data.waitSave(() => {
								data.add(values);
							}).then((result) => {
								values.id = result.id;
							});
						}
						this.form.clear();
						this.table.clearSelection();
					}
				},
				actionCancel: () => {
					this.form.clear();
					this.table.clearSelection();
				},
				rules: this.rules
			};


			return {
				cols: [
					table,
					form
				]
			};
		}).catch(showError("Datatabe is not loaded"));
	}

	init() {
		this.form = this.$$("form");
		this.table = this.$$("table");
		this.table.parse(this.dataItems);
	}
}
