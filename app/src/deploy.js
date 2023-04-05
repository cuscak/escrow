import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

async function getDeployedEscrow(provider, signer, address) {

  // const code = await provider.getCode(address);
  // if (Escrow.bytecode === code){
  //   console.log('MATCH!!');
  // }

  const escrow = new ethers.Contract(address, Escrow.abi, signer);
  const beneficiary = await escrow.beneficiary();
  const arbiter = await escrow.arbiter();
  const balance = await signer.getBalance();
  const isApproved = await escrow.isApproved();

  const result = {
    address,
    arbiter,
    beneficiary,
    value: ethers.utils.formatEther(balance),
    isApproved,
    handleApprove: async () => {
      escrow.on('Approved', () => {
        document.getElementById(address).className =
          'complete';
        document.getElementById(address).innerText =
          "✓ It's been approved!";
      });

      await approve(escrow, signer);
    },
  };

  return result;
}

export { deploy, getDeployedEscrow };
