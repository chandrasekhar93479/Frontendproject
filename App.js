const connectButton = document.getElementById('connectButton');
const walletInfo = document.getElementById('walletInfo');
const walletAddressSpan = document.getElementById('walletAddress');
const solBalanceSpan = document.getElementById('solBalance');
const actions = document.getElementById('actions');
const statusDiv = document.getElementById('status');

let provider = null;

const getProvider = () => {
  if ('solana' in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};

const getBalance = async (publicKey) => {
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
  const balance = await connection.getBalance(publicKey);
  return balance / solanaWeb3.LAMPORTS_PER_SOL;
};

connectButton.addEventListener('click', async () => {
  provider = getProvider();
  if (!provider) return;

  try {
    const resp = await provider.connect();
    const publicKey = resp.publicKey;
    walletAddressSpan.innerText = publicKey.toString();

    const balance = await getBalance(publicKey);
    solBalanceSpan.innerText = balance.toFixed(4);

    walletInfo.classList.remove('hidden');
    actions.classList.remove('hidden');
    statusDiv.innerText = 'Wallet Connected Successfully!';
  } catch (err) {
    console.error(err);
    statusDiv.innerText = 'Failed to connect wallet.';
  }
});

// Create Token Button (Dummy Example)
document.getElementById('createTokenBtn').addEventListener('click', () => {
  statusDiv.innerText = 'Token Created Successfully (Simulated)';
});

// Mint Token Button (Dummy Example)
document.getElementById('mintTokenBtn').addEventListener('click', () => {
  statusDiv.innerText = 'Token Minted Successfully (Simulated)';
});
