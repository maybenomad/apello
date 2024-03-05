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
