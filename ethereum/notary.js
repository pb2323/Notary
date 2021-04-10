import web3 from "./web3";
import Notary from "./build/Notary.json";

const instance = new web3.eth.Contract(
  JSON.parse(Notary.interface),
  "0x71F011BdCd4229b47393A8Cb6Aae3d7a8BBA8e1f"
);

export default instance;
