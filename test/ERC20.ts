import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ZeroAddress } from "ethers";
import hre from "hardhat";


const name = "Test token";
const symbol = "TTKN";
const initialSupply = 1000n;

describe("ERC20", function() {
    async function deployERC20Fixture() {
        const [ owner, address1, address2 ] = await hre.ethers.getSigners();

        const ERC20 = await hre.ethers.getContractFactory('XERC20');
        const erc20 = await ERC20.deploy(name, symbol);

        await erc20.x_mint(owner, initialSupply)

        return { erc20, owner, address1, address2 };
    }

    describe("Deployment", function() {
        it('should set the name', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await erc20.name()).to.equal(name);
        });

        it('should set the symbol', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await erc20.symbol()).to.equal(symbol);
        });

        it('should set the decimal', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await erc20.decimal()).to.equal(18n);
        });
    })

    describe("balanceOf", function() {
        it('should show the balance as 0 when the account has no tokens', async function() {
            const { erc20, address1 } = await loadFixture(deployERC20Fixture);
            expect(await erc20.balanceOf(address1)).to.equal(0n);
        })
        
        it('should show the total amount when the account has tokens', async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            expect(await erc20.balanceOf(owner)).to.equal(initialSupply);
        })
    })

    describe("totalSupply", function() {
        it('should return total supply', async function() {
            const { erc20 } = await loadFixture(deployERC20Fixture);
            expect(await erc20.totalSupply()).to.equal(initialSupply);
        })
    })

    describe("_transfer", function() {
        it("should reject when from is a zerro address", async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);

            await expect(erc20.x_transfer(ZeroAddress, owner, initialSupply))
                .to.be.revertedWithCustomError(erc20, 'ErrorInvalidSender')
                .withArgs(ZeroAddress);
        })
        it("should reject when to is a zerro address", async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);

            await expect(erc20.x_transfer(owner, ZeroAddress, initialSupply))
                .to.be.revertedWithCustomError(erc20, 'ErrorInvalidReceiver')
                .withArgs(ZeroAddress);
        })

        it("should not be reverteed", async function() {
            const { erc20, owner, address1 } = await loadFixture(deployERC20Fixture);

            expect(erc20.x_transfer(owner, address1, initialSupply)).to.not.be.reverted;
        })
    })

    describe("_mint", function() {
        it('should reject zero accounts', async function () {
            const { erc20 } = await loadFixture(deployERC20Fixture);

            await expect(erc20.x_mint(ZeroAddress, initialSupply))
                .to.be.revertedWithCustomError(erc20, 'ErrorInvalidReceiver')
                .withArgs(ZeroAddress);
        });

        it('should accept no zero accounts and increase total supply', async function () {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            await erc20.x_mint(owner, amount);
            await expect(await erc20.totalSupply()).to.be.equal(initialSupply + amount);
        });

        it('should accept no zero accounts and change balance', async function () {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            const tx = await erc20.x_mint(owner, amount);
            await expect(tx).to.changeTokenBalance(erc20, owner, amount);
        });

        it('should emit Transfer event', async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);

            const tx = await erc20.x_mint(owner, initialSupply);
            await expect(tx).to.emit(erc20, 'Transfer')
                .withArgs(ZeroAddress, owner, initialSupply)
        })
    })

    describe("_burn", function() {
        it('should reject zero accounts', async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            await expect(erc20.x_burn(ZeroAddress, amount))
                .to.be.revertedWithCustomError(erc20, 'ErrorInvalidSender')
                .withArgs(ZeroAddress);
        })

        it('should reject when burning more than balance', async function() {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);

            expect(erc20.x_burn(owner, initialSupply + 10n))
                .to.be.revertedWithCustomError(erc20, 'ErrorInsufficientBalance')
                .withArgs(owner, initialSupply, initialSupply + 110n);
        })

        it('should accept no zero accounts and increase total supply', async function () {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            await erc20.x_burn(owner, amount);
            await expect(await erc20.totalSupply()).to.be.equal(initialSupply - amount);
        });

        it('should accept no zero accounts and change balance', async function () {
            const { erc20, owner } = await loadFixture(deployERC20Fixture);
            const amount = 100n;
            const tx = await erc20.x_burn(owner, amount);
            await expect(tx).to.changeTokenBalance(erc20, owner, -amount);
        });
    })

    

})