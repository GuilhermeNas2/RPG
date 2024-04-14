"use client"
import { useState } from "react";

import { Label, LabelInfo } from "../components/label";
import Button from "../components/button";
import Header from "../components/header";


export default function createChar() {

    const [nome, setNome] = useState('');
    const [classe, setClasse] = useState('');
    const [number, setNumber] = useState('');
    const [raça, setRaça] = useState('');
    const [nivel, setNivel] = useState('');

    const [str, setStr] = useState('');
    const [des, setDes] = useState('');
    const [char, setChar] = useState('');
    const [int, setInt] = useState('');
    const [sab, setSab] = useState('');
    const [cons, setCons] = useState('');    

    const handleFile = async (e:any) => {
        const file = e.target.files[0];
        
        const formData = new FormData();   
        formData.append('image', file)     
        console.log(formData)
        const response = await fetch('http://127.0.0.1:5000/postImage', {
        method: 'POST',            
        body: formData,
        });
        
    };    

    

    const sendData = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
             

        const response = await fetch('http://127.0.0.1:5000/postPersona', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({"persona":{nome, classe, nivel, raça},"status":{ str,int,des,char,cons,sab}}),
        });

        const data = await response.json();
        console.log(data);
        setNumber(data.mensagem);
    }

    return (
        <>
            <Header></Header>
            <main >
                <form action=""
                onSubmit={sendData}
                className="w-full">
                    <div className="w-full bg-white h-60 flex">   
                        <LabelInfo title="Nome" nome={nome} param={(e:any) => setNome(e.target.value)} holder="Nome" type="text"></LabelInfo>
                        <LabelInfo title="Classe" nome={classe} param={(e:any) => setClasse(e.target.value)} holder="Classe" type="text"></LabelInfo>
                        <LabelInfo title="Raça" nome={raça} param={(e:any) => setRaça(e.target.value)} holder="Raça" type="text"></LabelInfo>
                        <LabelInfo title="Nivel" nome={nivel} param={(e:any) => setNivel(e.target.value)} holder="Nivel" type="number"></LabelInfo>                                              
                    </div>
                    <div className="flex bg-white justify-around ">
                        <div className="text-white w-1/2">
                            <label htmlFor="">
                                <input type="file" id="teste" onChange={handleFile}/>
                            </label>
                        </div>
                        <div className="w-1/2">
                        <h2>Status</h2>              
                            <Label title="Força" nome={str} param={(e:any) => setStr(e.target.value)} holder="Força" type="number"></Label>
                            <Label title="Destreza" nome={des} param={(e:any) => setDes(e.target.value)} holder="Destreza" type="number"></Label>
                            <Label title="Constituição" nome={cons} param={(e:any) => setCons(e.target.value)} holder="Constituição" type="number"></Label>
                            <Label title="Carisma" nome={char} param={(e:any) => setChar(e.target.value)} holder="Carisma" type="number"></Label>
                            <Label title="Inteligência" nome={int} param={(e:any) => setInt(e.target.value)} holder="Inteligência" type="number"></Label>
                            <Label title="Sabedoria" nome={sab} param={(e:any) => setSab(e.target.value)} holder="Sabedoria" type="number"></Label>                
                            <Button title="enviar"></Button>                
                        </div>
                    </div>
                </form>
          </main>
         </>
    )
}