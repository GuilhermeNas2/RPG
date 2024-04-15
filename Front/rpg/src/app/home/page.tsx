'use client'
import { useState } from "react"
import Header from "../components/header"
import Link from "next/link"

export default function Home() {
    
    const [persona, setPersona] = useState<any>([])

    const user = JSON.parse(localStorage.getItem('data'))  
    
    const requestPersona = async () => {
        
        const response = await fetch(`http://127.0.0.1:5000/getPersona?id=${user.id}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            }
        });

        const data = await response.json();        
        setPersona(data.mensagem);
    }

    const handleList = async () => {
        requestPersona();
    }

    return (
        <>
            <Header></Header>
                <main>
                    <button onClick={handleList}>Lista</button>
                    <ul>
                        {persona && persona.map((char:string) => <li><Link href={`/ficha?nome=${char}`}>{char}</Link></li>)}
                    </ul>                    
                </main>
        </>
    )
}