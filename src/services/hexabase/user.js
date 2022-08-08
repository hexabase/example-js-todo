import { createClient } from "@hexabase/hexabase-js";

const hexabaseTokenName = "hexabaseToken";
const getHexabaseClient = (params = {}) => {
  const token = localStorage.getItem(hexabaseTokenName);
  if (Object.keys(params).length === 0 && token) {
    params.token = token;
  }
  params.url = "https://graphql.hexabase.com/graphql";
  return createClient(params);
};

const login = async (email, password) => {
  const client = await getHexabaseClient({ email, password });
  localStorage.setItem(hexabaseTokenName, client.tokenHxb);
  return client.tokenHxb;
};

const logout = async () => {
  const client = await getHexabaseClient();
  localStorage.removeItem(hexabaseTokenName);
  return client.auth.logout();
};

const getUserInfo = async () => {
  const client = await getHexabaseClient();
  return client.auth.get(client.tokenHxb);
};

export default {
  login,
  logout,
  getUserInfo,
};

export { getHexabaseClient };
