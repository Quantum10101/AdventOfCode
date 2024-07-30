import eaz from "eaz-utils";
import { MenuActionEnum } from "./MenuActionEnum.ts";
import { MenuAction, type MenuItem } from "../lib/MenuAction.ts";
import { cmd } from "../lib/cmd.ts";

export class ChooseDay extends MenuAction {
	title: string = "Choose Day";
	command: string = "";
	menuText: string = "";
	
	action(data: Record<string, any>): void {
		this.menuSystem.menuHistory.push({menuAction: this.menuActionEnum, data});
		
		process.stdout.write(`${cmd.CLS}`);
		process.stdout.write(`${this.title}\n\n`);
		
		const year = data["year"];
		
		const dayFolders = eaz.fileSystem.listOf.directories(`../solutions/${year}`);
		
		const menuItems: MenuItem[] = [];
		
		dayFolders
			.map(x => parseInt(x.replace("day", "")))
			.sort()
			.forEach(day => {
				console.log(`Day ${day}: ${this.menuSystem.data["puzzleTitles"][year][day]}`);
				
				menuItems.push({
					menuAction: MenuActionEnum.RunPuzzle,
					command: day.toString(),
					data: {year, day}
				});
			});
		
		menuItems.push({menuAction: MenuActionEnum.LastMenu});
		menuItems.push({menuAction: MenuActionEnum.Exit});
		console.log("\nr. Return to Choose Year");
		console.log("x. Exit\n");
		
		this.menu(menuItems, false, "Choose Day #");
	}
}
