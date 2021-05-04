import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNameAndLogo } from '../api/GetNameAndLogo'
import { GetProduct } from '../api/GetProduct'
import { PostLogin } from '../api/PostLogin'
import Auth from '../auth/Auth'
import ProductCard from '../components/atom/productCard/ProductCard'
import SliderGallery from '../components/atom/slider/SliderGallery'
import Header from '../components/molecules/header/Header'
import LoginModal from '../components/molecules/loginModal/Login'
import ProductList from '../components/molecules/productList/ProductList'
import { bannerData } from '../helpers/bannerDataList'
import { priceToRupiah } from '../helpers/priceToRupiah'
import { NameLogoModelType } from '../models/NameLogoModel'
import { OriginalPriceModelType, ProductDetailModelType, ProductModelType } from '../models/ProductModel'
import { StoreStateType } from '../store'
import { addProductPrice, addProductQuantity } from '../store/cart/action'
import { ProductStateType } from '../store/cart/type'
import styles from '../styles/Home.module.scss'
import Cookies from 'universal-cookie';
import { UserModelType } from '../models/UserModel'


const Home = ({
  nameLogo,
  token,
  productData
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [ nameAndLogo ] = useState(nameLogo as NameLogoModelType)
  const [ productDataList ] = useState(productData as ProductDetailModelType[])
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchTyped, setIsSearchTyped] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleAddress, setToggleAddress] = useState(false)
  const [toggleLogin, setToggleLogin] = useState(false)
  const router = useRouter();
  const {
    // productDataList,
    productUid,
    productQuantity,
    productPrice,
  } = useSelector((state: StoreStateType) => state.product);
  const dispatch = useDispatch();
  const [orderCounter, setOrderCounter] = useState(productQuantity || 0);
  const [orderPrice, setOrderPrice] = useState(productPrice || 0);
  const cookies = new Cookies();
  const cookie_username: string = process.env.username!;
  const cookie_otp: string = process.env.otp_code!;
  const [ usernameInput , setUsernameInput ] = useState('')
  const [ otpInput , setOtpInput ] = useState('')
  console.log(productDataList, 'apani')

  useEffect(()=>{
    // Auth.checkSession('/', false);

  },[])

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

  const showLogin = () => {
    console.log(toggleAddress,'address')
    setToggleLogin(!toggleLogin)
  }

  const imageStyle = {
    width: '30px',
    cursor: 'pointer'
  }

  const clickImage = () => {
    setIsSearch(!isSearch);
    setSearch('')
    router
  }
  const removeData = () => {
    console.log('saved di hapus');
    dispatch(addProductQuantity(0));
    dispatch(addProductPrice(0));
  };

  const addToCart = (i:number, counter: number, price: number) => {
    const items = productDataList.map((item) => Object.assign({}, item));
    items[i].count = Number(counter);
    const { uid, original_price } = productDataList[i];
    const orderPriceConverted = original_price.price.toString()
    setOrderCounter(orderCounter + counter);
    setOrderPrice(parseInt(orderPriceConverted) + orderPrice);
    dispatch(addProductQuantity(orderCounter));
    dispatch(addProductPrice(parseInt(orderPriceConverted)));
    console.log(parseInt(orderPriceConverted), orderCounter, orderPrice, 'apaniiiredux')
  }

  const usernameHandleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setUsernameInput(value);
    console.log(value, 'apanilogin')
  };

  const otpHandleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setOtpInput(value);
    console.log(value, 'apanilogin')
  };

  const loginHandler = () => {
   
      PostLogin(usernameInput, otpInput, token).then((result) => {
        console.log(result, 'apaniresultlogin')
      })

  }

//   const cartModal = () => {
//     return (
//         <div className={`cart-modal ${toggleCart ? 'show' : ''}`}>
//             {/* <div className="background" onClick={popupHandler}></div> */}
//             <div className="popup-box">
//                 <div className="popup-box-top">
//                     <div className="popup-box-title">
//                     <span className="title">{amount} Items | {priceToRupiah(price)}</span> <br />
//                     <span className="subtitle">Termasuk ongkos kirim</span>
//                     </div>
//                     <div onClick={popupHandler} className='popup-close'>
//                         <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: '10px'}}/>
//                         <FontAwesomeIcon icon={faChevronRight} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

  return (
    <div className={`${styles['container']}`}>
      {
        !isSearch ? 
          <>
            <SliderGallery bannerData={bannerData} />
            <div className={`${styles['main']}`}>

              <ProductList
                productData={productDataList}
                value='Produk Terlaris'
                addToCart={addToCart}
              />
            </div>
          </>
         : 
          <div className={`${styles[`main`]} ${isSearch && isSearchTyped ? styles['search-on'] : styles['']}`}>
              {
                isSearchTyped ? 
                <h1>Hasil pencarian untuk : {search}</h1> : null
              }
              <div className={`${styles['product-list']}`} >              
                <div className={`${styles['product-card']}`} >              
              { isSearchTyped ?
                      productDataList
                      // eslint-disable-next-line
                      .filter(item => {
                          if (!search) return true
                          if (item.name.toLowerCase().includes(search)) {
                              return true
                      }
                      })
                      .map((result, i) => (
                            <div className={`${styles['product-card-list']}`} >              
                              <div className={`${styles['product-image']}`} key={result.uid}>
                                  <img src={result.primary_image_url} />
                              </div>
                              <div className={`${styles['product-main']}`}>
                                  <h1>{result.name}</h1>
                                  <div className={`${styles['product-price']}`}>{priceToRupiah(result.original_price.price)}</div> 
                                  <div className={`${styles['product-sold']}`}>Terjual | {result.total_sold}</div>  
                              </div>
                              <div className={`${styles['add-to-cart']}`}>
                                  <button className={`${styles['button']}`} onClick={() =>addToCart(i, 1, result.original_price.price)}>
                                      <FontAwesomeIcon icon={faPlus} style={{width: '20px'}}/>
                                      <span className={`${styles['text']}`}>Add to cart</span>
                                  </button>    
                              </div>
                            </div>
                      ))
                      
                      : null
                    }
                </div>
              </div>
            </div>
      }

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
          clickImage={isSearch ? clickImage : () => router.push('/')}
          toggleLogin={showLogin}
        />

        {/* Login Modal */}
        <LoginModal
          popupHandler={showLogin}
          action={toggleLogin}
          loginHandler={loginHandler}
          email={usernameInput}
          otpCode={otpInput}
          usernameHandleChange={usernameHandleChange}
          otpHandleChange={otpHandleChange}
        />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const token: number = Auth.getSessionToken();
  const nameLogo: NameLogoModelType = await GetNameAndLogo(token);
  const productData: ProductDetailModelType[] = await GetProduct(token,'');

  return {
    props: {
      token: token || process.env.api_key,
      nameLogo: nameLogo || ({} as NameLogoModelType),
      productData: productData || ([] as ProductDetailModelType[]),
    },
  };
};

export default Home