const web3 = require("./web3");
import Notary from "./build/Notary.json";

const instance = new web3.eth.Contract(
  Notary.interface,
  "0x71F011BdCd4229b47393A8Cb6Aae3d7a8BBA8e1f"
);

export default instance;
