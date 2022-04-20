import {JetView} from "webix-jet";

export default class Settings extends JetView {
	config() {
		const language = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					view: "segmented",
					localId: "languages",
					label: _("Language"),
					inputWidth: 400,
					align: "center",
					value: language,
					options: [
						{id: "en", value: _("English")},
						{id: "ru", value: _("Russian")}
					],
					click: () => this.toggleLanguage()
				}
			]
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("languages").getValue();
		langs.setLang(value);
	}
}
