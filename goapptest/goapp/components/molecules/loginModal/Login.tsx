import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Login.module.scss';
import MaterialTextField from '../../atom/materialTextInput/MaterialTextInput';
import FontAwesome from 'react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


interface AddressModalProps {
    popupHandler: (e:any) => void;
    usernameHandleChange: (e:any) => void;
    otpHandleChange: (e:any) => void;
    loginHandler: (e:any) => void;
    action: boolean;
    email: string;
    otpCode: string;
  }

const LoginModal: FC<AddressModalProps> = (props) => {
    const { action, popupHandler, usernameHandleChange, otpHandleChange, loginHandler, email, otpCode} = props;
  
    return (
    <div className={`${styles[`login-modal`]} ${action ? styles['show'] : styles['']}`}>
        <div className={`${styles['background']}`} onClick={popupHandler}></div>
        <div className={`${styles['login-box']}`}>
            <div className={`${styles['top']}`}>
                <FontAwesomeIcon icon={faTimes} style={{cursor: 'pointer'}} onClick={popupHandler}/>
            </div>
            <div className={`${styles['title']}`}>
                <h1>Login</h1>
            </div>
            <div className={`${styles['input']}`}>
                <MaterialTextField
                    value={email}
                    placeholder="Masukkan alamat email"
                    label="Alamat Email"
                    onChange={usernameHandleChange}
                    name="username"
                />
                <MaterialTextField
                    value={otpCode}
                    placeholder="Masukkan otp Code"
                    label="OTP Code"
                    onChange={otpHandleChange}
                    name="otp_code"
                />
            </div>
            <div className={`${styles['submit']}`}>
                <button className={`${styles['button']}`} onClick={loginHandler}>Submit</button>
            </div>
            <div className={`${styles['otp-request']}`}>
                <span className={`${styles['text']}`}>
                    Belum punya otp? Request dengan klik 
                    <Link href="/request">
                        <span className={`${styles['link']}`}> disini</span>
                    </Link>
                </span>
            </div>
        </div>
    </div>
  );
};

export default LoginModal;
