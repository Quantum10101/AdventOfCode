import { MenuAction } from "./MenuAction.ts";
import { MenuActionEnum } from "../ops/MenuActionEnum.ts";

export type HistoryItem = {
	menuAction: MenuActionEnum;
	data?: Record<string, any>;
}

export class MenuSystem {
	menuActions: Record<MenuActionEnum, MenuAction>;
	firstMenu: undefined|HistoryItem;
	menuHistory: Array<HistoryItem> = new Array<HistoryItem>();
	data: Record<string, any> = {};
	
	constructor(menuActions: Record<MenuActionEnum, MenuAction>, data?: Record<string, any>) {
		for (let [_, value] of Object.entries(menuActions)) {
			value.menuSystem = this;
		}
		
		this.menuActions = menuActions;
		
		if (data !== undefined) {
			this.data = data;
		}
	}
	
	nextAction(menuAction: MenuActionEnum, data?: Record<string, any>): void {
		if (this.firstMenu === undefined) this.firstMenu = {menuAction, data};
		this.menuActions[menuAction].action(data);
	}
	
	lastAction(data?: Record<string, any>): void {
		const lastAction = this.menuHistory.pop();
		if (lastAction === undefined) {
			if (this.firstMenu === undefined) throw Error("MenuSystem was set up, but never a call to nextAction");
			if (data === undefined) data = this.firstMenu.data;
			this.nextAction(this.firstMenu.menuAction, data);
		}
		else {
			if (data === undefined) data = lastAction.data;
			this.nextAction(lastAction.menuAction, data);
		}
	}
}
