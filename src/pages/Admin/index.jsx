import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import Logo from "../../components/logo";
import Input from "../../components/input";
import "./admin.css";
import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#f1f1f1");
  const [textColorInput, setTextColorInput] = useState("#121212");
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(lista);
    });
  }, []);
  async function handleRegister(e) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.warn("preencha todos os campos");
      return;
    }
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("link registrado com sucesso");
        toast.success("link registrado com sucesso ;)");
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR" + error);
        toast.error("Ops, erro ao salvar o link");
      });
  }
 async function handleDeleteLink(id){
   const docRef = doc(db,"links", id)
   await deleteDoc(docRef)
  }

  return (
    <div className="admin-container">
      <Header />

      <Logo />
      <form className="form" onSubmit={handleRegister}>
        <label className="lable">Nome do link</label>
        <Input
          placeholder="Nome do link..."
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <label className="lable">URL do link</label>
        <Input
          type="url"
          placeholder="URL do link..."
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />
        <section className="container-colors">
          <div>
            <label className="lable right">Fundo do link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(event) => setBackgroundColorInput(event.target.value)}
            />
          </div>
          <div>
            <label className="lable right">Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(event) => setTextColorInput(event.target.value)}
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="preview">
            <label className="lable"> Veja como está ficando👇</label>
            <article
              className="list"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}
        <button className="btn-register" type="submit">
          Cadastrar <MdAddLink size={24} color="#fff" />{" "}
        </button>
      </form>
      <h2 className="title">Meus links</h2>
      {links.map((item, index) => (
        <article
          key={index}
          className="list animate-pop"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button className="btn-delete" onClick={()=> handleDeleteLink(item.id)}>
              <FiTrash2 size={18} color="#000" />{" "}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
