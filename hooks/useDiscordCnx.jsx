import axios from "axios";
import { useCallback, useState } from "react";

import { useAuthContext } from "./useAuthContext";

export const useDiscordCnx = () => {
  //add the discord user to the db
  //check the wallet cnx

  const [error, setError] = useState(null);

  //const { wallet, token } = useAuthContext();

  const authorizeDiscord = async (
    name,
    discordId,
    discordImage,
    wallet,
    token
  ) => {
    //console.log(wallet,token)
    try {
      setError(null);
      if (wallet && token) {
        console.log("Payload", name, discordId, discordImage, wallet, token);
        const response = await axios.post(
          "https://apello-api.xyz:4000/api/users",
          {
            name,
            discordId,
            discordImage,
            wallet,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("SUCCESSFUL AXIOS POST");
        return response.data;
        //console.log('new wallet added',json);
      } else {
        console.log("no wallet or token", wallet, token);
      }
    } catch (err) {
      console.log(
        "FAILED POST: /api/users/",
        err.response ? err.response.data.err : err.message
      );
      setError(err.response ? err.response.data.err : err.message);
      console.log(err);
    }
  };

  return { authorizeDiscord, error };
};
