const level1 = ["getblue", "getred", "setblue", "setred"];
const level2 = [
  "getblue-getred",
  "getblue-setblue",
  "getblue-setred",
  "getred-setblue",
  "getred-setred",
  "setblue-setred",
];

console.log(level1.slice(0).sort());
console.log(level2.slice(0).sort());
