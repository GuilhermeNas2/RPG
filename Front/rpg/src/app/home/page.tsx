'use client'
import { useState } from "react"

import Link from "next/link"
import {Header} from "../components/header"

export default function Home() {
    
    const [persona, setPersona] = useState<any>([]);
    const [visible, setVisible] = useState(false);

    const user = JSON.parse(localStorage.getItem('data')); 
    
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

    return (
        <>
            <Header></Header>
                <main>
                    <button onClick={handleList}>Lista</button>
                   { visible == true ? 
                    <ul>
                        {persona && persona.map((char:string) => <li><Link href={`/ficha?nome=${char}`}>{char}</Link></li>)}
                    </ul> : <></>}                   
                </main>
        </>
    )
}