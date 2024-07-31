import eaz from "eaz-utils";
import readlineSync from "readline-sync";
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
		const sessionCookie = process.env.AOC_SESSION_COOKIE;
		
		const cacheFiles = eaz.fileSystem.listOf.files(`../solutions/${year}/day${day}`).filter(x => x.endsWith(".cache"));
		
		if (cacheFiles.includes("data.cache") === false) {
			const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
				headers: {
					"Cookie": `session=${sessionCookie}`
				}
			});
			
			if (response.ok) {
				const data = await response.text();
				const pwd = eaz.fileSystem.pathToScript.directory();
				await Bun.write(`${pwd}/../solutions/${year}/day${day}/data.cache`, data);
				cacheFiles.push("data.cache");
			}
		}
		
		const codeFiles = eaz.fileSystem.listOf
			.files(`../solutions/${year}/day${day}`)
			.filter(x => x.endsWith(".ts"))
			.sort();
		
		for (const codeFile of codeFiles) {
			console.log(`${cmd.color.YELLOW}${cmd.text.BOLD}${cmd.text.UNDERLINE}${codeFile}${cmd.text.RESET}\n`);
			for (const cacheFile of cacheFiles) {
				console.log(`${cmd.color.WHITE_DARK}${cmd.text.ITALICS}${cacheFile}${cmd.text.RESET}`);
				const { stdout } = Bun.spawn(["bun", "run", `solutions/${year}/day${day}/${codeFile}`, cacheFile]);
				console.log(await Bun.readableStreamToText(stdout));
			}
		}
		
		process.stdout.write("Press ENTER to continue.");
		process.stdout.write(`${cmd.cursor.HIDE}`);
		readlineSync.question();
		process.stdout.write(`${cmd.cursor.SHOW}`);
		
		this.menuSystem.lastAction();
	}
}
