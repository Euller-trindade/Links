import React, { useState } from "react";
import "./login.css";
import Logo from "../../components/logo";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Bem vindo de volta :)");
        navigate("/admin", { replace: true });
      })
      .catch(() => {
        toast.error("Erro ao fazer o login");
        console.log("erro ao fazer o login ");
      });
  }
  return (
    <div className="login-container">
      <Logo />
      <form className="form" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha..."
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}
