import cookie from 'cookie';
export default (req, res) => {
  const query = req.query;
  let token;

  if (query.q === 'getToken') {
    if (process.env.NODE_ENV === 'development') {
      token = req.cookies._coin_minimi_dev;
    } else if (
      process.env.NEXT_PUBLIC_PUBLIC_URL == 'https://stag.minimi.co.id'
    ) {
      token = req.cookies._coin_minimi_stag;
    } else if (process.env.NODE_ENV === 'production') {
      token = req.cookies._coin_minimi;
    }
  } else if (query.q === 'getUsername') {
    if (process.env.NODE_ENV === 'development') {
      token = req.cookies._username_minimi_dev;
    } else if (
      process.env.NEXT_PUBLIC_PUBLIC_URL == 'https://stag.minimi.co.id'
    ) {
      token = req.cookies._username_minimi_stag;
    } else if (process.env.NODE_ENV === 'production') {
      token = req.cookies._username_minimi;
    }
    // res.statusCode = 200;
    // res.json({ cookie: username });
  } else if (query.q === 'setToken') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(process.env.NEXT_PUBLIC_COOKIE_TOKEN, req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        //maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
      })
    );
  } else if (query.q === 'setUsername') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(
        process.env.NEXT_PUBLIC_COOKIE_USERNAME,
        req.body.username,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          //maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        }
      )
    );
  } else if (query.q === 'removeToken') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(process.env.NEXT_PUBLIC_COOKIE_TOKEN, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );
  } else if (query.q === 'removeUsername') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(process.env.NEXT_PUBLIC_COOKIE_USERNAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );
  }
  res.statusCode = 200;
  res.json({ message: 'Nothing to see here', token: token });
};
