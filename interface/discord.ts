import axios from "axios";

const AUTHORIZE_URL =
  "https://discord.com/api/oauth2/authorize?client_id=990757313390465114&redirect_uri=https%3A%2F%2Fapello.xyz%2Fholder&response_type=token&scope=identify";

export function authorize() {
  window.open(AUTHORIZE_URL, "_self");
}

export function avatarURL(account) {
  return `https://cdn.discordapp.com/avatars/${account.id}/${account.avatar}`;
}

export function getCurrentUser(tokenType, token) {
  return axios.get("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
}
