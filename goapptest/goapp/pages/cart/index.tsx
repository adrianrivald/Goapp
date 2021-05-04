import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { GetCart } from '../../api/GetCart'
import { GetNameAndLogo } from '../../api/GetNameAndLogo'
import Auth from '../../auth/Auth'
import Header from '../../components/molecules/header/Header'
import { CartModelType, LinesModelType } from '../../models/CartModel'
import { NameLogoModelType } from '../../models/NameLogoModel'
import styles from './Cart.module.scss'

const Cart = ({
   token,
   nameLogo
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [cart, setCart] = useState({} as CartModelType)
  const [cartItem, setCartItem] = useState([] as LinesModelType[])
  const cookies = new Cookies();
  const cookie_username: string = process.env.COOKIE_USERNAME!;
  const cookie_token: string = process.env.COOKIE_TOKEN!;
  const tokenLogin = cookies.get(cookie_token);
  const usernameLogin = cookies.get(cookie_username);
  
    useEffect(()=>{
      if(tokenLogin || usernameLogin) {
        GetCart(token,tokenLogin).then((result)=> {
          setCart(result)
          setCartItem(result.lines)
          console.log(result.lines,'apanicart')
        })
      } else {
        emptyState();
      }
    },[])

    const emptyState = () => {
      return (
        <div>
          kosong
        </div>
      )
    }

    return (
        <div className={`${styles['cart']}`}>
            <div className={`${styles['cart-item']}`}>
              {
                cartItem.map((result)=> {
                  return (
                    <div>
                      <h1>{result.product.uid}</h1>
                      <h1>{result.quantity}</h1>
                    </div>
                  )
                })
              }
            </div>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const token: number = Auth.getSessionToken(req);
  const nameLogo: NameLogoModelType = await GetNameAndLogo(token);
  
    return {
      props: {
        token: token || process.env.api_key,
        nameLogo: nameLogo || ({} as NameLogoModelType),
      },
    };
  };

export default Cart