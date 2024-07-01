import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const name = "Test token";
const symbol = "TTKN";
const initialSupply = 1000n;

describe("ERC20", function() {
    async function deployERC20Fixture() {
        const [ owner, address1, address2 ] = await hre.ethers.getSigners();

        const ERC20 = await hre.ethers.getContractFactory('$ERC20');
        console.log(ERC20)
        const erc20 = ERC20.deploy(name, symbol);
        

        return { erc20, owner, address1, address2 };
    }

    describe("Deployment", function() {
        it('should set the name', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await erc20).to.equal(name);
        });

        it('should set the symbol', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await (await erc20).symbol()).to.equal(symbol);
        });

        it('should set the decimal', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await (await erc20).decimal()).to.equal(18n);
        });
    })

    // describe("mint", function() {
    //     it('should reject zero accounts', async function () {
    //         const { erc20 } = await loadFixture(deployERC20Fixture);
    //         expect(erc20.$_mint(hre.ethers.ZeroAddress)).to.equal(name);
    //     });

    // })
    describe("balanceOf", function() {
        it('should show the balance as 0 when the account has no tokens', async function() {
            const { erc20, owner, address1 } = await loadFixture(deployERC20Fixture);
            console.log(await (await erc20).balanceOf(address1));
            expect(await (await erc20).balanceOf(owner)).to.equal(0n);
        })
        it('should show the total amount when the account has tokens', async function() {
            const { erc20, address1 } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            await (await erc20).transfer(address1, amount);
            // expect(await (await erc20).balanceOf(address1)).to.equal(amount);
        })
    })

})