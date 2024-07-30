import { MenuAction } from "./MenuAction.ts";

export class ExitAction extends MenuAction {
	title: string = "Exit";
	command: string = "x";
	menuText: string = "Exit";
	
	action(): void {
		process.exit();
	}
}
