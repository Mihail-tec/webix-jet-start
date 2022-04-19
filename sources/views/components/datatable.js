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
		const _ = this.app.getService("locale")._;
		return this.dataItems.waitData.then(() => {
			const data = this.dataItems;
			const obj = data.getItem(data.getFirstId());
			const fields = Object.keys(obj).filter(key => key !== "id").map(
				el => ({name: el, label: _(el)})
			);
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
							data.add(values);
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
		});
	}

	init() {
		this.form = this.$$("form");
		this.table = this.$$("table");
		this.table.parse(this.dataItems);
	}
}
