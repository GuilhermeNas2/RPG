'use client'
import { use, useEffect, useState } from "react"

import Link from "next/link"
import {Header} from "../components/header"

export default function Home() {
    
    const [persona, setPersona] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [msg, setMsg ] = useState('')
    
    const cache = localStorage.getItem('data'); 

    let bora: any
    let user: { id: any; };

    if(cache) {
        user = JSON.parse(cache);
    }
    
    const socket = new WebSocket("ws://localhost:8000");        

    socket.addEventListener("message", (event)  => {
        bora = event.data 
        handleDiv(bora)         
    });     


    function sendMessage(event: React.MouseEvent<HTMLButtonElement>) {   
       if(socket.readyState === WebSocket.OPEN){
            socket.send(msg)
        }
    };
    
    const requestPersona = async () => {
        
        const response = await fetch(`http://127.0.0.1:5000/getPersona?id=${user.id}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            }
        });

        const data = await response.json();        
        setPersona(data.mensagem);
    };

    const handleList = async () => {
        requestPersona();
        setVisible(!visible);
    };

    function handleDiv(data:string) {
        let div = document.querySelector('.chat') 
        let span = document.createElement('span')   
        const content = document.createTextNode(data)

        if(div){            
            span.appendChild(content)
            div.appendChild(span)
        }  
    }    

    return (
        <>
            <Header></Header>
                <main>
                    <div className="w-1/6 h-screen gap-3 flex flex-col p-2 bg-fuchsia-200">
                        <button className="bg-orange-100 text-black rounded-sm h-14 p-3 font-sedan"
                        onClick={handleList}>Lista</button>
                    { visible == true ? 
                        <ul className="">
                            {persona && persona.map((key:string) => <li className="bg-orange-200 text-center mb-1 p-1"><Link href={`/ficha?nome=${key}`}>{key}</Link></li>)}
                        </ul> : <></>} 
                        <button className="bg-orange-100 text-black rounded-sm h-14 p-3 font-sedan">Criar Aventura</button>
                    </div> 
                    <div id="Chat" className="chat flex flex-col">
                        <label htmlFor="">
                            <input type="text" 
                            value={msg}
                            onChange={(e)=> setMsg(e.currentTarget.value)}/>
                            <button onClick={sendMessage}>enviar</button>
                        </label>                        
                    </div>

                </main>
        </>
    )
}