"use client";
import { useState } from "react";


export default function Home() {

  const [nome, setNome] = useState('');
  const [classe, setClasse] = useState('');
  const [number, setNumber] = useState('');

  const sendData = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/front_data', {
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
      </main>
      <footer>

      </footer>
    </>
  );
}
