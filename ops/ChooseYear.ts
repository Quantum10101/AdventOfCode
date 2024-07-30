import eaz from "eaz-utils";
import { MenuActionEnum } from "./MenuActionEnum.ts";
import { MenuAction, type MenuItem } from "../lib/MenuAction.ts";
import { cmd } from "../lib/cmd.ts";

export class ChooseYear extends MenuAction {
	title: string = "Choose Year";
	command: string = "y";
	menuText: string = "Choose Year";
	
	action(): void {
		this.menuSystem.menuHistory.push({menuAction: this.menuActionEnum});
		
		process.stdout.write(`${cmd.CLS}`);
		process.stdout.write(`${this.title}\n\n`);
		
		const yearFolders = eaz.fileSystem.listOf.directories("../solutions");
		
		const menuItems: MenuItem[] = [];
		
		if (yearFolders.length > 0) {
			for (const yearFolder of yearFolders) {
				menuItems.push({
					menuAction: MenuActionEnum.ChooseDay,
					command: yearFolder,
					data: {year: yearFolder}
				});
			}
			
			console.log(yearFolders.join("\n"));
		}
		
		menuItems.push({menuAction: MenuActionEnum.Exit, menuText: "Exit"});
		console.log("\nx. Exit\n");
		
		this.menu(menuItems, false, "Choose Year");
	}
}
