import eaz from "eaz-utils";

const input = eaz.fileSystem.file.get.text(Bun.argv[2]);

let floor = 0;
const movements = input.split("");
for (const movement of movements) {
	if (movement == "(") floor++;
	else floor--;
}

console.log(floor);
