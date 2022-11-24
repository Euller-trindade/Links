import React from "react";
import { Link } from "react-router-dom";
import "./logo.css";

export default function Logo() {
  return (
    <div>
      <Link className="logo" to="/">
        <h1>
          Seu<span>Link</span>
        </h1>
      </Link>
    </div>
  );
}
