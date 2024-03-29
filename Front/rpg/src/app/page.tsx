"use client";
import { useState } from "react";


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
      <header>
        <div>
          TKD RPG
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>ola</div>
          <div>{number}</div>
          <div>
            <form action=""
              onSubmit={sendData}>
              <label htmlFor="">
                <input type="text" 
                 placeholder="Nome"
                 onChange={(e) => setNome(e.target.value)}
                 value={nome} 
                 className="text-zinc-950"
                  />
                <input type="text" 
                 placeholder="classe" 
                 onChange={(e) => setClasse(e.target.value)} 
                 value={classe}
                 className="text-zinc-950"
                  />
              </label>
              <button type="submit">enviar</button>
            </form>
          </div>

          <div>
            <h2>Status</h2>
            <form action=""
              onSubmit={sendStatus}>
              <label htmlFor="">
                <input type="text" 
                 placeholder="Força"
                 onChange={(e) => setStr(e.target.value)}
                 value={str} 
                 className="text-zinc-950"
                  />
                <input type="text" 
                 placeholder="Destreza" 
                 onChange={(e) => setDes(e.target.value)} 
                 value={des}
                 className="text-zinc-950"
                  />
                   <input type="text" 
                 placeholder="Constituição" 
                 onChange={(e) => setInt(e.target.value)} 
                 value={int}
                 className="text-zinc-950"
                  />
                   <input type="text" 
                 placeholder="Carisma" 
                 onChange={(e) => setSab(e.target.value)} 
                 value={sab}
                 className="text-zinc-950"
                  />
                   <input type="text" 
                 placeholder="Inteligência" 
                 onChange={(e) => setCons(e.target.value)} 
                 value={cons}
                 className="text-zinc-950"
                  />
                   <input type="text" 
                 placeholder="Sabedoria" 
                 onChange={(e) => setChar(e.target.value)} 
                 value={char}
                 className="text-zinc-950"
                  />
              </label>
              <button type="submit">enviar</button>
            </form>
          </div>
      </main>
      <footer>

      </footer>
    </>
  );
}
