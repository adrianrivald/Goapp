import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { GetNameAndLogo } from '../../api/GetNameAndLogo'
import Auth from '../../auth/Auth'
import Header from '../../components/molecules/header/Header'
import { NameLogoModelType } from '../../models/NameLogoModel'
import styles from './Cart.module.scss'

const Cart = ({
   token,
   nameLogo
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [ nameAndLogo ] = useState(nameLogo as NameLogoModelType)
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isSearchTyped, setIsSearchTyped] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    
    const onChange = (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        setSearch(value)
        if (value.length > 0){
          setIsSearchTyped(true)
        } else {
          setIsSearchTyped(false)
        }
      }
    
      const onFocus = (e:any) => {
        setIsSearch(true)
      }
    
      const imageStyle = {
        width: '30px',
        cursor: 'pointer'
      }
    
      const clickImage = () => {
        setIsSearch(!isSearch);
        setSearch('')
      }
  
    useEffect(()=>{
  
    },[])

    return (
        <div className={`${styles['cart']}`}>
                

                {/* Floating header */}
        <Header
          value={search} 
          logoImage={!isSearch ? nameAndLogo.logo.image_url : "https://d29fhpw069ctt2.cloudfront.net/icon/image/39092/preview.png"} 
          cartImage="https://icons.iconarchive.com/icons/iconsmind/outline/512/Shopping-Cart-icon.png"
          loginImage="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          onChange={onChange} 
          name="search_query" 
          onFocus={onFocus}
          style={isSearch ? imageStyle : null}
          clickImage={isSearch ? clickImage : null}
        />
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
  const token: number = Auth.getSessionToken();
  const nameLogo: NameLogoModelType = await GetNameAndLogo(token);
  
    return {
      props: {
        token: token || process.env.api_key,
        nameLogo: nameLogo || ({} as NameLogoModelType),
      },
    };
  };

export default Cart