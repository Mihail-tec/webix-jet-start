/* eslint-disable linebreak-style */
import {JetView} from "webix-jet";


export default class Settings extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented",
					localId: "languages",
					label: "Language",
					inputWidth: 400,
					align: "center",
					options: [
						{id: "eng", value: "English"},
						{id: "rus", value: "Russian"}
					]
				}
			]
		};
	}
}
