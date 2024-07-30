import { MenuSystem } from "./lib/MenuSystem.ts";
import { MenuActionEnum } from "./ops/MenuActionEnum.ts";
import { EmptySpace } from "./lib/EmptySpace.ts";
import { ExitAction } from "./lib/ExitAction.ts";
import { LastMenuAction } from "./lib/LastMenuAction.ts";
import { ChooseYear } from "./ops/ChooseYear.ts";
import { ChooseDay } from "./ops/ChooseDay.ts";
import { RunPuzzle } from "./ops/RunPuzzle.ts";

const config = JSON.parse(await Bun.file("config.json").text());

const menuSystem = new MenuSystem(
	{
		[MenuActionEnum.EmptySpace]: new EmptySpace(MenuActionEnum.EmptySpace),
		[MenuActionEnum.Exit]: new ExitAction(MenuActionEnum.Exit),
		[MenuActionEnum.LastMenu]: new LastMenuAction(MenuActionEnum.LastMenu),
		[MenuActionEnum.ChooseYear]: new ChooseYear(MenuActionEnum.ChooseYear),
		[MenuActionEnum.ChooseDay]: new ChooseDay(MenuActionEnum.ChooseDay),
		[MenuActionEnum.RunPuzzle]: new RunPuzzle(MenuActionEnum.RunPuzzle),
	},
	config
);

menuSystem.nextAction(MenuActionEnum.ChooseYear);
