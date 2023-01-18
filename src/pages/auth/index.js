import React from "react";

// template page
import { Authentication } from "../../templates";

// style
import style from "./style/Auth.module.css";

// component
import Image from "next/image";
import Head from "next/head";

// Authentication
import { GoogleLogin } from "react-google-login";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import { providerFacebook, providerTwitter } from "../../config/auth/firebase";

// API
import Api from "../../config/api";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";

export default function Login() {
  /*
   * Proses login
   * fungsi dibawah ini merupakan fungsi untuk
   * melakukan proses autentikassi menggunakan sosial media
   */

  // google
  async function responseGoogle(response) {
    try {
      if (response !== undefined) {
        // response dari google tentang informasi user
        const user = response.profileObj;

        // membuat form data yang akan dikirim ke server
        const body = new FormData();
        body.append("nama", user.name);
        body.append("kontak", user.email);
        body.append("foto", user.imageUrl);
        body.append("platform-login", "google");
        body.append("tipe-platform", "sosial");

        // kirim data ke server
        const send = await fetch(`${Api.api_endpoint}/authentication/login`, {
          method: "POST",
          headers: {
            Authorization: Api.authorization,
          },
          body: body,
        });

        // pesan dari server
        const server_response = await send.json();
        
        // create jwt token
        const token = jwt.sign(server_response.data, Api.jwt_key, {algorithm: "HS256"})

        // simpan di cookie
        cookie.set("auth_user", token, { expires: 30, path: "/" });

        // redirect to home page
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);



        // if (server_response.status === 200 || server_response.status == 201) {
        //   // enkripsi data user
        //   jwt.sign(
        //     server_response.data,
        //     Api.jwt_key,
        //     { expiresIn: "30 days" },
        //     (err, encoded) => {
        //       // simpan data user di cookie
        //       cookie.set("auth_user", encoded, { expires: 30, path: "/" });

        //       // redirect ke home page
        //       setTimeout(() => {
        //         window.location.href = "/";
        //       }, 1000);
        //     }
        //   );
        // }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // facebook
  function responseFacebook() {
    const auth = getAuth();
    signInWithPopup(auth, providerFacebook)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.warn(error);
      });
  }

  // login dengan menggunakan twitter
  function responseTwitter() {
    const auth = getAuth();
    signInWithPopup(auth, providerTwitter)
      .then(async (result) => {
        const user = result.user.providerData[0];

        // membuat form data yang akan dikirim ke server
        const body = new FormData();
        body.append("nama", user.displayName);
        body.append("kontak", user.email);
        body.append("foto", user.photoURL);
        body.append("platform-login", "twitter");
        body.append("tipe-platform", "sosial");

        // kirim data ke server
        const send = await fetch(`${Api.api_endpoint}/authentication/login`, {
          method: "POST",
          headers: {
            Authorization: Api.authorization,
          },
          body: body,
        });

        // pesan dari server
        const server_response = await send.json();

        if (server_response.status === 200 || server_response.status == 201) {
          // enkripsi data user
          jwt.sign(
            server_response.data,
            Api.jwt_key,
            { expiresIn: "30 days" },
            (err, encoded) => {
              // simpan data user di cookie
              cookie.set("auth_user", encoded, { expires: 30, path: "/" });

              // redirect ke home page
              setTimeout(() => {
                window.location.href = "/";
              }, 1000);
            }
          );
        }
      })
      .catch((error) => {
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.warn(error);
      });
  }

  // login dengan menggunakan nomor hp

  function createRechapta() {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          numberResponse();
        },
      },
      auth
    );
  }

  function numberResponse() {
    createRechapta();
    const phoneNumber = "+6281351387634";
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        // ...
      })
      .catch((error) => {
        console.warn(error);
        // Error; SMS not sent
        // ...
      });
  }

  return (
    <Authentication>
      {/* header */}
      <Head>
        <title>Login | Lapak Belajar</title>
        <meta
          name="description"
          content="Login dengan akun media sosial mu untuk memulai menjelahi lapak belajar"
        />
      </Head>
      {/*  */}

      <h3>Lapak Belajar.</h3>
      <small>
        Untuk melanjutkan silahkan gunakan salah satu akun media sosial kamu
      </small>

      {/* button social media */}
      <div className={style.auth_box}>
        <GoogleLogin
          clientId="334149533601-raef8ms75d3tirpf5l7f1qij2is2qj5a.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={style.auth_btn}
              type="button"
            >
              <Image
                src="/icon/google.svg"
                alt="google"
                width="28"
                height="28"
              />
              <span>Google</span>
            </button>
          )}
        />

        {/* <button onClick={() => responseFacebook()} className={style.auth_btn} type="button">
                    <Image src="/icon/facebook.svg" alt="facebook" width="22" height="22"/>
                    <span>Facebook</span>
                </button> */}

        <button
          onClick={() => responseTwitter()}
          className={style.auth_btn}
          type="button"
        >
          <Image src="/icon/twitter.svg" alt="twitter" width="28" height="28" />
          <span>Twitter</span>
        </button>

        {/* <button onClick={() => numberResponse()} className={style.auth_btn} type="button">
                    <Image src="/icon/tiktok.svg" alt="tiktok" width="28" height="28"/>
                    <span>Tiktok</span>
                </button> */}

        <div id="sign-in-button" className="sign-in-button"></div>
      </div>

      {/* <hr/>

            <label className={style.input_label} htmlFor="nohp">nomor handphone</label>
            <input type="number" className={style.input} placeholder="+62"/> */}

      {/*  */}
      {/* <Link href='/auth/verification'>
                <a className={style.submit_no}>Lanjutkan</a>
            </Link> */}
    </Authentication>
  );
}
