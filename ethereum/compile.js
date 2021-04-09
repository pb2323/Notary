const fs = require("fs-extra");
const solc = require("solc");
const path = require("path");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const notaryPath = path.resolve(__dirname, "contracts", "Notary.sol");
const source = fs.readFileSync(notaryPath, "utf-8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
