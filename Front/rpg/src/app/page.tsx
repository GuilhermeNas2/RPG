"use client";
import { useState } from "react";
import Label from "./components/label";
import { title } from "process";
import Button from "./components/button";
import Header from "./components/header";


export default function Home() {

  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState('');
  const [number, setNumber] = useState('');
  const [str, setStr] = useState('');
  const [des, setDes] = useState('');
  const [char, setChar] = useState('');
  const [int, setInt] = useState('');
  const [sab, setSab] = useState('');
  const [cons, setCons] = useState('');

  const sendData = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/rolld6', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({nome, classe}),
    });

    const data = await response.json();
    console.log(data);
    setNumber(data.mensagem);
  }
  
  const sendStatus = async (event: {preventDefault: () => void;}) => {
    event.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/postStatus', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({str,int,des,char,cons,sab, nome}),
    });
  }

  return (
    <>
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>ola</div>
          <div>{number}</div>
          <div>
            <form action=""
              onSubmit={sendData}>
              <Label title="Nome" nome={nome} param={(e:any) => setNome(e.target.value)} holder="Nome"></Label>
              <Button title="enviar"></Button>
            </form>
          </div>

          <div>
            <h2>Status</h2>
            <form action=""
              onSubmit={sendStatus}>
                <Label title="Força" nome={str} param={(e:any) => setStr(e.target.value)} holder="Força"></Label>
                <Label title="Destreza" nome={des} param={(e:any) => setDes(e.target.value)} holder="Destreza"></Label>
                <Label title="Constituição" nome={cons} param={(e:any) => setCons(e.target.value)} holder="Constituição"></Label>
                <Label title="Carisma" nome={char} param={(e:any) => setChar(e.target.value)} holder="Carisma"></Label>
                <Label title="Inteligência" nome={int} param={(e:any) => setInt(e.target.value)} holder="Inteligência"></Label>
                <Label title="Sabedoria" nome={sab} param={(e:any) => setSab(e.target.value)} holder="Sabedoria"></Label>                
                <Button title="enviar"></Button>
            </form>
          </div>
      </main>
      <footer>

      </footer>
    </>
  );
}
