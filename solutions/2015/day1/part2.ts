import eaz from "eaz-utils";

const input = eaz.fileSystem.file.get.text(Bun.argv[2]);

let steps = 0;
let floor = 0;
const movements = input.split("");
for (const movement of movements) {
	steps++;
	if (movement == "(") floor++;
	else floor--;
	if (floor === -1) break;
}

console.log(steps);
