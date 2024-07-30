import readlineSync from "readline-sync";
import { MenuActionEnum } from "../ops/MenuActionEnum.ts";
import { MenuSystem } from "./MenuSystem.ts";

export type MenuItem = {
	menuAction: MenuActionEnum;
	command?: string;
	menuText?: string;
	data?: Record<string, any>;
}

export abstract class MenuAction {
	menuActionEnum: MenuActionEnum;
	menuSystem!: MenuSystem;
	abstract title: string;
	abstract command: string;
	abstract menuText: string;
	
	constructor(menuActionEnum: MenuActionEnum) {
		this.menuActionEnum = menuActionEnum;
	}
	
	abstract action(data?: Record<string, any>): void;
	
	menu(items: MenuItem[], showMenu = true, chooseText = "Choose Option"): void {
		const commandCount: {[command: string]: number} = {};
		const commandIncrement: {[command: string]: number} = {};
		for (const item of items) {
			const menuAction = this.menuSystem.menuActions[item.menuAction];
			if (item.command === undefined) item.command = menuAction.command;
			if (item.menuText === undefined) item.menuText = menuAction.menuText;
			
			if (commandCount[item.command] === undefined) commandCount[item.command] = 0;
			commandCount[item.command]++;
			if (commandCount[item.command] > 1) commandIncrement[item.command] = 1;
		}
		
		const commandActions = new Map<string, MenuAction>();
		for (const item of items) {
			if (commandIncrement[item.command!] !== undefined) {
				const command = item.command!;
				item.command = command + commandIncrement[command];
				commandIncrement[command]++;
			}
			
			const menuAction = this.menuSystem.menuActions[item.menuAction];
			if (item.command !== "") commandActions.set(item.command!, menuAction);
		}
		
		if (showMenu === true) {
			for (const item of items) {
				if (item.command !== "") process.stdout.write(item.command + ". ");
				process.stdout.write(item.menuText + "\n");
			}
			
			process.stdout.write("\n");
		}
		
		let command: string;
		do {
			process.stdout.write(`${chooseText}: `);
			command = readlineSync.question();
		} while(commandActions.has(command) === false);
		
		const data = items.filter(x => x.command === command)[0].data;
		
		commandActions.get(command)?.action(data);
	}
}
