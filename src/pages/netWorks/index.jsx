import React, { useEffect, useState } from "react";
import { MdAddLink } from "react-icons/md";
import Header from "../../components/header";
import Input from "../../components/input";
import "./netWorks.css";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

export default function NetWorks() {
  const [Linkedin, setLinkedin] = useState("");
  const [WhatsApp, setWhatsApp] = useState("");
  const [Github, setGithub] = useState("");

   function handleSave(e) {
    e.preventDefault();

    setDoc(doc(db, 'social', 'link'),{
      linkedin: Linkedin,
      whatsApp: WhatsApp,
      github: Github
    })
    .then(() => {
      console.log('urls salvas com sucesso!')
      toast.success("Salvo com sucesso!")
    })
      .catch((error)=>{
        console.log('erro ao salvar' + error)
        toast.error('Erro ao salvar ao salvar seus links')
      })
  }
  useEffect(()=>{
    async function loadLinks (){
      const docRef = doc(db, 'social', 'link')
      getDoc(docRef)
      .then((snapShot)=>{
       if(snapShot.data()!== undefined){
        setLinkedin(snapShot.data().linkedin)
        setGithub(snapShot.data().github)
        setWhatsApp(snapShot.data().whatsApp)
       }
      })
    }
    loadLinks()
  }, [])
  return (
    <div className="admin-container">
      <Header />
      <h1 className="title-social">Suas redes sociais:</h1>
      <form className="form" onSubmit={handleSave}>
        <label className="lable">Link do Linkedin:</label>
        <Input
          placeholder="Digite a url do Linkedin..."
          value={Linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <label className="lable">Link do WhatsApp:</label>
        <Input
          placeholder="Digite a url do WhatsApp..."
          value={WhatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
        />
        <label className="lable">Link do Github:</label>
        <Input
          placeholder="Digite a url do Github..."
          value={Github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <button type="submit" className="btn-register">
          Salvar links <MdAddLink size={24} color="#fff" />
        </button>
      </form>
    </div>
  );
}
