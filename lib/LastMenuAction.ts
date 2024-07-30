import { MenuAction } from "./MenuAction.ts";

export class LastMenuAction extends MenuAction {
	title: string = "Last Menu";
	command: string = "r";
	menuText: string = "Return to Previous Menu";
	
	action(): void {
		this.menuSystem.menuHistory.pop();
		this.menuSystem.lastAction();
	}
}
