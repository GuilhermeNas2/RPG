"use client"
import { useEffect, useState } from "react";

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
    
    const [path, setPath] = useState('')
    const [classItem, setClassItem] = useState([]);
    const [raçaItem, setRaçaItem] = useState([]);

    let user = JSON.parse(localStorage.getItem('data'))  
    user = user.id

    const handleFile = async (e:any) => {
        const file = e.target.files[0];
        setPath(file)       

        const path = URL.createObjectURL(file);
        const picture = document.querySelector('img');    

        if(picture)
        {
            picture.src = path            
        };
    };    

    const loadImage = async (ident:any) => {    
        const formData = new FormData();   
        formData.append('image', path);  
            
        const response = await fetch(`http://127.0.0.1:5000/postImage?id=${ident}`, {
            method: 'POST',            
            body: formData,
        });        
      
        const data = await response.json();
        return data.caminho 
        
    };

    const handleSelect = (event: { target: { value: any; }; }, number:number) => {        
        const data = event.target.value
        if(number == 1){
            setClasse(data)
        }

        if(number ==2) {
            setRaça(data)
        }
        
    };
    
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await fetch('http://127.0.0.1:5000/getClasse', {
                method: 'GET',
                headers: {
                    "Content-type" : "application/json"
                    }
                })

                const data = await response.json()
                setClassItem(data.mensagem.Classe);
                setRaçaItem(data.mensagem.Raça);

            } catch {
                console.log('error')
            };
        };
        fetchData();
    },[]);
   
   const rollDice = async () => {
        const response = await fetch('http://127.0.0.1:5000/rollstats',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
        });
        const data = await response.json()
        setNumber(data.mensagem)
   };    
    

    const sendData = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();            
        
        const response = await fetch('http://127.0.0.1:5000/postPersona', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({"persona":{nome, classe, nivel, raça, user},"status":{ str,int,des,char,cons,sab}}),
        });

        const data = await response.json();
        loadImage(data.mensagem[0]);
       
    };  


    return (
        <>
            <Header></Header>
            <main >
                <form action=""
                onSubmit={sendData}
                className="w-full flex flex-col">
                    <div className="w-full bg-white h-25 flex border-2">   
                        <LabelInfo title="Nome" nome={nome} param={(e:any) => setNome(e.target.value)} holder="Nome" type="text"></LabelInfo> 
                        <LabelInfo htmlElement={
                            <>
                                <span>Classe</span>
                                <select name="Classe" id="" className="bg-slate-200 text-black" onChange={(event) => handleSelect(event,1)}>
                                    {classItem && classItem.map((classe: string) => <><option value={classe} className="text-black">{classe}</option></>
                                    )}
                                </select>
                            </>}>                            
                        </LabelInfo>   
                        <LabelInfo htmlElement={
                            <>
                                <span>Raça</span>
                                <select name="Classe" id="" className="bg-slate-200 text-black" onChange={(event) => handleSelect(event,2)}>
                                    {raçaItem && raçaItem.map((race: string) => <><option value={race} className="text-black">{race}</option></>
                                    )}
                                </select>
                            </>}>                            
                        </LabelInfo>  
                        <LabelInfo title="Nivel" nome={nivel} param={(e:any) => setNivel(e.target.value)} holder="Nivel" type="number"></LabelInfo>                                              
                    </div>
                    <div className="flex bg-white justify-around p-2">
                        <div className="text-white w-1/2 flex flex-col items-center border-2">
                            <div id="profilePicture" className=" w-1/2 h-1/2 bg-center">
                                <img className="w-max h-max" alt="" />
                            </div>
                            <label htmlFor="">
                                <input type="file" id="teste" onChange={handleFile}/>                                                               
                            </label>                            
                        </div>
                        <div className="flex flex-col items-center">
                            {number ? <span className="text-black">{number}</span> : <span className="text-black">0</span> }
                            <Button type="button" phrase="Rolar Dados" func={rollDice}></Button>
                        </div>
                        <div className="w-1/5 border-2 border-2 items-center flex flex-col" >
                        <h2>Status</h2>         
                            <Label title="Força" nome={str} param={(e:any) => setStr(e.target.value)} holder="Força" type="number"></Label>
                            <Label title="Destreza" nome={des} param={(e:any) => setDes(e.target.value)} holder="Destreza" type="number"></Label>
                            <Label title="Constituição" nome={cons} param={(e:any) => setCons(e.target.value)} holder="Constituição" type="number"></Label>
                            <Label title="Carisma" nome={char} param={(e:any) => setChar(e.target.value)} holder="Carisma" type="number"></Label>
                            <Label title="Inteligência" nome={int} param={(e:any) => setInt(e.target.value)} holder="Inteligência" type="number"></Label>
                            <Label title="Sabedoria" nome={sab} param={(e:any) => setSab(e.target.value)} holder="Sabedoria" type="number"></Label> 
                        </div>
                    </div>   
                    <Button type="submit" phrase="Enviar"></Button>                  
                </form>
          </main>
         </>
    )
}