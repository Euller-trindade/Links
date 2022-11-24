import React from "react";
import "./erro.css";
import { Link } from "react-router-dom";
import Logo from "../../components/logo";

export default function Error() {
  return (
    <div className="error">
      <Logo/>
      <h1>Página não encontrada</h1>
      <p>Esta página que está procurando não existe!</p>
      <Link className="link" to="/">
      Voltar para a página inicial
      </Link>
    </div>
  );
}
