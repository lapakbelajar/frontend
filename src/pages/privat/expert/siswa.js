import style from "./css/Siswa.module.css";

// component
import Profile from "../component/Profile";
import DashboardTemplates from "./templates/main";
import Head from "next/head";

// authorization
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import api from "../../../config/api";
import { useEffect, useState } from "react";

export default function Siswa() {
  const [user, setUser] = useState({
    id: 0,
  });

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    jwt.verify(cookie.get("auth_user"), api.jwt_key, (err, decoded) => {
      if (err) {
        window.location.href = "/login";
      } else {
        setUser(decoded);
        getStudents(decoded.id);
      }
    });
  }

  /**
   * Mengambil list siswa
   */

  async function getStudents(userid) {
    try {
      const req = await fetch(
        `${api.api_endpoint}/privat/expert/class/student/${userid}`,
        {
          headers: {
            authorization: api.authorization,
          },
        }
      );
      const res = await req.json();
      let user = [];
      res.forEach((items) => {
        user.push(items.user);
      });
      const filtered = Array.from(new Set(user.map((a) => a.id))).map((id) => {
        return user.find((a) => a.id === id);
      });
      setListUser(filtered);
    } catch (err) {
      //
      console.warn(err);
    }
  }

  return (
    <DashboardTemplates>
      <Head>
        <title>Data Murid</title>
      </Head>
      {listUser.map((items, i) => (
        <div style={{ marginTop: 20 }} key={i}>
          <Profile
            name={items.name}
            education={items.school}
            image={items.image}
            skils={items.jurusan}
          />
        </div>
      ))}
    </DashboardTemplates>
  );
}
