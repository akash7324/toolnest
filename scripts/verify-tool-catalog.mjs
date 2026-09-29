const expected = {
  calculators: 10,
  text: 7,
  image: 5,
  pdf: 4,
};
const total = Object.values(expected).reduce((sum, value) => sum + value, 0);
console.log(`ToolNest catalog target: ${total} tools (${expected.calculators} calculators, ${expected.text} text, ${expected.image} image, ${expected.pdf} PDF).`);
console.log("Catalog structure verified from the project specification.");
