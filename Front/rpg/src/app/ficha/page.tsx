"use client"
import { useState, useEffect } from "react"

export default function Ficha({nome}:any) {

    nome = "Atlas"

    const [info, setInfo] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://127.0.0.1:5000/getPersona?nome=${nome}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }                
                });
            const data =  await response.json() 
            console.log(data["mensagem"][0]);
            setInfo(data);
        }

        fetchData();
    }, [nome])
    return(
        <h1>Ola</h1>
    )
}