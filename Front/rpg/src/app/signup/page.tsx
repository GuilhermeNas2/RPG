'use client'
import { useState } from "react";
import { LabelLogin } from "../components/label";
import { changePage } from "../router/router";

export default function Signup() {
    const [name, setName] = useState('')
    const [key, setKey] = useState('')
    const [email, setEmail] = useState('')

    async function createAccount(e: { preventDefault: () => void; }) {
        e.preventDefault()
        
        try{
            const result = await fetch('http://127.0.0.1:5000/signup', {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"data": {name, key, email}})
            })

            changePage('/login');
        } catch {
            console.log("Opa")
        }

    }


    return(
        <>
           <div className="flex w-full h-fit">
                <div className="w-1/2">
                    <h1>TESTE</h1>
                </div>                
                <div className="bg-white h-screen w-1/2 flex flex-col items-center">                    
                    <form action=""
                    onSubmit={createAccount}
                    className="w-3/4 h-1/2 flex flex-col gap-2 items-center p-3">
                        <h2 className="text-neutral-500 text-5xl my-20">Olá viajante</h2>
                        <LabelLogin title="Usuário" nome={name} holder="Guilherme" type="text" param={(e:any) => setName(e.target.value)}></LabelLogin>
                        <LabelLogin title="Senha" nome={key} holder="" type="password" param={(e:any) => setKey(e.target.value)}></LabelLogin>
                        <LabelLogin title="Email" nome={email} holder="tkdhouse2@gmail.com" type="text" param={(e:any) => setEmail(e.target.value)}></LabelLogin>
                        <button type="submit" className="text-white bg-sky-500 p-2 rounded-md hover:bg-cyan-600">Criar conta</button>
                    </form>
                </div>
            </div>    
        </>
    )
}







    
  