import axios from 'axios';

export const GetNameAndLogo = async (
    token: number
) => {

  axios.defaults.headers.common = {
    "X-API-Key": token,
  };

  const result: any = await axios
    .get(
      `https://api.dev.goapp.co.id/v1/directory/api/business/0/`,
    )
    .then(({ data }) => {
      console.log('Datatatat', data);
      return data;
    })
    .catch((error) => {
    });
  return result;
};
