import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Request.module.scss'
import Cookies from 'universal-cookie';
import MaterialTextField from '../../components/atom/materialTextInput/MaterialTextInput'
import { PostRequestLogin } from '../../api/PostRequestLogin'
import Auth from '../../auth/Auth'
import { AuthModelType } from '../../models/UserModel'


const Request = ({
token
} :InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [ request, setRequest] = useState({} as AuthModelType)

  useEffect(()=>{
    // Auth.checkSession('/', false);

  },[])

  const usernameHandleChange = (e: any) => {
    e.preventDefault();
    const { value, name } = e.target;
    setRequest((multipleInput) => ({ ...multipleInput, [name]: value }));
    console.log(request, 'apanireq')
  };

  const requestOtp = () => {
      PostRequestLogin(request, token).then((result)=> {
          console.log(result,'apanirequ')
      })
  }

  return (
    <div className={`${styles['request']}`}>
        <MaterialTextField
            label="Email"
            placeholder="Masukkan email Anda"
            name="otp_request"
            value={request.address}
            onChange={usernameHandleChange}
        />
        <button className={`${styles['submit']}`} onClick={requestOtp}>
            Submit
        </button>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
    const token: number = Auth.getSessionToken();
  
    return {
      props: {
        token: token || process.env.API_KEY,
      },
    };
  };


export default Request