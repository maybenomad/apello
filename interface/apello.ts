import axios from "axios";

const BASE_URL = "https://apello-api.xyz:4000";

export function addWallet(chainName, address) {
  return axios.post(`${BASE_URL}/api/wallets`, {
    type: chainName,
    adress: address,
  });
}

export function checkWallet(token, address) {
  return axios.get(`${BASE_URL}/api/wallets/verify/${address}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function linkDiscord(token, wallet, account) {
  return axios.post(
    `${BASE_URL}/api/users`,
    {
      name: account.username,
      discordId: account.id,
      discordImage: account.avatar,
      wallet: {
        adress: wallet.address,
        type: wallet.chain,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
