import React, { FormEvent } from "react";
import "../Auth.css";
import { Link } from "react-router-dom";

function Register() {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div>
      <h2>Reactgram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a senha" />
        <input type="submit" value="CADASTRAR" />
      </form>
      <p>
        Já tem conta? <Link to={"/login"}>Clique aqui.</Link>
      </p>
    </div>
  );
}

export default Register;
