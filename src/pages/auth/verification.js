// template page
import {Authentication} from '../../templates'

// style
import style from './style/Auth.module.css'


// component
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'


export default function Verification(){
    return (
        <Authentication>

            {/* header */}
            <Head>
                <title>Verifikasi | Lapak Belajar</title>
                <meta name='description' content="Verifikasi nomor OTP ( one time password ) yang telah kami kirimkan ke nomor telepon anda"/>
            </Head>
            {/*  */}

            <h3>OTP</h3>
            <small>
                masukan kode OTP ( one time password )
                yang telah kami kirimkan ke +628123****1
            </small>

            <div className={style.auth_box}>

                <input type="number" className={style.input_otp} placeholder="Masukan kode otp di sini"/>
                <button type="button" className={style.submit_no}>Lanjutkan</button>                
            </div>
        </Authentication>
    )
}