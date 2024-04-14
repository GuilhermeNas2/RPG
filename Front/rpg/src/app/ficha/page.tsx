'use client'
import { useState, useEffect } from "react"
import { useUser } from "../userContext";
import { useSearchParams  } from "next/navigation";
import Header from "../components/header";
import DivFicha from "../components/div";


export default function Ficha() {

    const router = useSearchParams();
    const nome = router.get("nome");      

    const [info, setInfo] = useState<any>();
    const [teste, setTeste] = useState<any>();

    
    useEffect(() => {
        async function fetchData() {
            try
            {
                const response = await fetch(`http://127.0.0.1:5000/getPersonaStats?nome=${nome}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }                
                });
                   
                const data =  await response.json() 
                setInfo(data.status); 
                setTeste(data.status.Status)               
            } catch {
                console.log("error")
            }          
           
        }        
        fetchData();
        
    }, [nome])    
     
    
    return(
        <>            
            <Header></Header>
             {info && 
             <>
                <h1>
                    {info["Nome"]}
                </h1>
                <div className="flex flex-col">
                    <div>
                        <div className="bg-orange-200 flex flex-col">
                            {info.Classe}                        
                        </div>                    
                    </div>
                    <div className="flex">
                        <div>
                            teste
                        </div>
                        <div>
                           <DivFicha title="Força" value={info.Status.Força} modify={info.Modificadores.Força}></DivFicha>
                           <DivFicha title="Destreza" value={info.Status.Destreza} modify={info.Modificadores.Destreza}></DivFicha>
                           <DivFicha title="Constituição" value={info.Status.Constituição} modify={info.Modificadores.Constituição}></DivFicha>
                           <DivFicha title="Carisma" value={info.Status.Carisma} modify={info.Modificadores.Carisma}></DivFicha>
                           <DivFicha title="Inteligência" value={info.Status.Inteligência} modify={info.Modificadores.Inteligência}></DivFicha>
                           <DivFicha title="Sabedoria" value={info.Status.Sabedoria} modify={info.Modificadores.Sabedoria}></DivFicha> 
                        </div>
                    </div>
                </div>
             </>
             }            
        </>
    )
}