import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const cookie_name: string = process.env.api_key;

const getSessionToken = () => {
  let token;
    token = 45115823594568
  return (token || process.env.api_key);
};

const removeSession = () => {
  fetch('/api/additional?q=removeToken', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  fetch('/api/additional?q=removeUsername', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
};

//If you need token or guarded route use this function
//to check if token and username already stored or not
//avoid page login, register, forgot password, send email password
//handle with yourself

//from -> when page needed login will redirect to login page
//and back to from page
const checkSession = async (from: string, needLogin: boolean) => {
  //needLogin : true -> login, register, forgot password
  // send email password
  // dont use this if page no need login
  const token: string = await axios
    .get('/api/additional?q=getToken')
    .then((value) => {
      return value.data.token;
    });

  if (token &&   needLogin === false) {
    window.location.href = '/';
  } else if (!token &&  needLogin === true) {
    window.location.href = `/login?message=login-first&from=${from}`;
  }
};

export default {
  getSessionToken,
  removeSession,
  checkSession,
};
