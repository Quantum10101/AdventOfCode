import eaz from "eaz-utils";

const input = eaz.fileSystem.file.get.text(Bun.argv[2]);

let total = 0;
const boxes = input.split("\n");
for (const box of boxes) {
	if (box === "") continue;
	const [l, w, h] = box.split("x").map(x => parseInt(x));
	const largest = [l, w, h].reduce((a, b) => {
		return a > b ? a : b;
	}, 0);
	const ribbonSides = [l, w, h].filter(x => x != largest);
	if (ribbonSides.length < 2) ribbonSides.push(largest);
	if (ribbonSides.length < 2) ribbonSides.push(largest);
	total += ribbonSides[0]*2 + ribbonSides[1]*2 + l*w*h;
}

console.log(total);
