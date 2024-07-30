import { MenuAction } from "./MenuAction.ts";

export class EmptySpace extends MenuAction {
	title: string = "";
	command: string = "";
	menuText: string = "";
	
	action(): void {}
}
