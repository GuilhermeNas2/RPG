"use client"
import { useState } from "react"
import { changePage } from "../router/router";
import { LabelLogin } from "../components/label";
import Link from "next/link";

export default function Login() {
    
    const [data, setData] = useState('');  
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 

    async function sendData(event: { preventDefault: () => void }, user: string, key: string) {
        event.preventDefault();       

        try{
            const result = await fetch(`http://127.0.0.1:5000/teste?user=${user}&key=${key}`, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            });
            const data = await result.json();
            console.log(data.status[0])
            setData(data);             
            changePage('ficha');
            
        } catch {
            console.log("opa");
        }      
        
    }   
   
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        sendData(event, name, password);        
    }   

    return (
        <>
            <div className="flex w-full h-fit">
                <div className="w-1/2">
                    <h1>TESTE</h1>
                </div>                
                <div className="bg-white h-screen w-1/2 flex flex-col items-center">                    
                    <form action=""
                    onSubmit={(event) => handleSubmit(event)}
                    className="w-3/4 h-1/2 flex flex-col gap-3 items-center p-3">
                       <h2 className="text-neutral-500 text-5xl my-24">Seja bem vindo a Taverna</h2>
                       <LabelLogin title="Usuário" nome={name} holder="Guilherme" type="text" param={(e:any) => setName(e.target.value)}></LabelLogin>
                       <LabelLogin title="Senha" nome={password} holder="" type="password" param={(e:any) => setPassword(e.target.value)}></LabelLogin>
                       <div className="flex flex-col items-start mb-10 gap-1"> 
                        <span className="text-neutral-500"><Link href={'/signup'}>Não faz parte da guilda?</Link></span>
                        <span className="text-neutral-500">Esqueceu a senha?</span>
                       </div>
                        <button type="submit" className="text-white bg-sky-500 p-2 rounded-md hover:bg-cyan-600">Login</button>
                    </form>
                </div>
            </div>    
        </>
    )
}
