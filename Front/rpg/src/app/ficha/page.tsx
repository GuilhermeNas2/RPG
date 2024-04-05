"use client"
import { useState, useEffect } from "react"


export default function Ficha({nome}:any) {

    nome = "Guilherme"

    const [info, setInfo] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            try
            {
                const response = await fetch(`http://127.0.0.1:5000/getPersona?nome=${nome}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }                
                });
                   
                const data =  await response.json() 
                setInfo(data);                
            } catch {
                console.log("error")
            }          
           
        }        
        fetchData();
        
    }, [nome])    
     
    
    return(
        <>            
             {info && 
             <h1> (Classe: {info.status[0].Carisma}, Nível: {info.Nivel}      
            )</h1>  }
            
        </>
    )
}