import { useRouter } from 'next/dist/client/router';
import React, { CSSProperties } from 'react';
import SearchBar from '../../atom/searchBar/SearchBar';
import styles from './Header.module.scss';

interface HeaderProps {
  logoImage: string;
  cartImage: string;
  loginImage: string;
  value: string;
  onChange: (e: any) => void;
  onFocus: (e: any) => void;
  clickImage: (e: any) => void;
  name: string;
  style?: CSSProperties;
  toggleLogin: (e: any) => void;
}

const Header = (Props: HeaderProps) => {
  const {
    logoImage,
    cartImage,
    loginImage,
    value,
    onChange,
    onFocus,
    name,
    style,
    clickImage,
    toggleLogin
  } = Props;
  const router = useRouter();
  
 
  return (
    <div className={`${styles['header']}`}>
        <div className={`${styles['header-content']}`}>
            <div className={`${styles['logo']}`} onClick={clickImage}>
                <img src={logoImage} style={style} />
            </div>
            <SearchBar placeholder="Cari di GoFit Apparel" onFocus={onFocus} value={value} name={name} onChange={onChange}/>
            <div className={`${styles['icon']}`}>
              <div className={`${styles['cart']}`}>
                  <img src={cartImage} onClick={() =>router.push('/cart')}/>
              </div>
              <div className={`${styles['login']}`} onClick={toggleLogin}>
                  <img src={loginImage} />
              </div>
            </div>
        </div>
    </div>
  );
};

export default Header;
