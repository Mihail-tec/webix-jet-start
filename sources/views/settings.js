import {JetView} from "webix-jet";

export default class Settings extends JetView {
	config() {
		const language = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		const ru = _("Russian");
		const en = _("English");
		const languag = _("Language");
		return {
			rows: [
				{
					view: "segmented",
					localId: "languages",
					label: languag,
					inputWidth: 400,
					align: "center",
					value: language,
					options: [
						{id: "en", value: en},
						{id: "ru", value: ru}
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
