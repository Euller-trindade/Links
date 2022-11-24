import React, { useState, useEffect } from "react";
import Social from "../../components/social";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import "./home.css";
import { db } from "../../services/firebaseConnection";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef)
        .then((snapShot) => {
          let lista = [];
          snapShot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color,
            });
            setLinks(lista);
          });
        })
        .catch(() => {});
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapShot) => {
        if (snapShot.data() !== undefined) {
          setSocialLinks({
            linkedin: snapShot.data().linkedin,
            whatsApp: snapShot.data().whatsApp,
            github: snapShot.data().github,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);
  return (
    <div className="home-container">
      <h1>Euller Trindade</h1>
      <span>veja meus links👇</span>
      <main className="links">
        {links.map((item) => (
          <section
            key={item.id}
            className="link-area"
            style={{ backgroundColor: item.bg }}
          >
            <a href={item.url} target="blank">
              <p className="link-text" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>
        ))}
        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>

            <Social url={socialLinks?.whatsApp}>
              <FaWhatsapp size={35} color="#fff" />
            </Social>

            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
