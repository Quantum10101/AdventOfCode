import eaz from "eaz-utils";

const input = eaz.fileSystem.file.get.text(Bun.argv[2]);

let total = 0;
const boxes = input.split("\n");
for (const box of boxes) {
	if (box === "") continue;
	const [l, w, h] = box.split("x").map(x => parseInt(x));
	const side1 = l*w;
	const side2 = w*h;
	const side3 = h*l;
	const smallest = [side1, side2, side3].reduce((a, b) => {
		return a < b ? a : b;
	}, Infinity);
	total += side1*2 + side2*2 + side3*2 + smallest;
}

console.log(total);
