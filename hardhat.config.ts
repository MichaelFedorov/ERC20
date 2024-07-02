import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'solidity-coverage';
import "hardhat-exposed"

export default <HardhatUserConfig> {
  solidity: "0.8.24",
  exposed: {
    prefix: "x"
  }
};
