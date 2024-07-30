import eaz from "eaz-utils";
import readlineSync from "readline-sync";
import { $ } from "bun";
import { cmd } from "../lib/cmd.ts";
import { MenuAction } from "../lib/MenuAction.ts";

export class RunPuzzle extends MenuAction {
	title: string = "Run Puzzle";
	command: string = "r";
	menuText: string = "Run Puzzle";
	
	async action(data: Record<string, any>): Promise<void> {
		process.stdout.write(`${cmd.CLS}`);
		
		const year = data["year"];
		const day = data["day"];
		
		const files = eaz.fileSystem.listOf.files(`../solutions/${year}/day${day}`).sort();
		
		for (const file of files) {
			const { stdout } = Bun.spawn(["bun", "run", `solutions/${year}/day${day}/${file}`]);
			console.log(await Bun.readableStreamToText(stdout));
		}
		
		process.stdout.write("Press ENTER to continue.");
		process.stdout.write(`${cmd.cursor.HIDE}`);
		readlineSync.question();
		process.stdout.write(`${cmd.cursor.SHOW}`);
		
		this.menuSystem.lastAction();
	}
}
