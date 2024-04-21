'use client'
import { useState, useEffect } from "react"
import { useUser } from "../userContext";
import { useSearchParams  } from "next/navigation";
import {Header} from "../components/header";
import {DivFicha, DivInfo} from "../components/div";


export default function Ficha() {

    const router = useSearchParams();
    const nome = router.get("nome");      

    const [info, setInfo] = useState<any>();
    

    const loadImage = (path:string) => {
        const picture = document.getElementById('picture') as HTMLImageElement;
        
        if(picture){
         picture.src = path
        }
    };

    
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
                   
                const data =  await response.json(); 
                setInfo(data.status);                 
                loadImage(data.status.Path)                 
            } catch {
                console.log("error");
            };  
           
        };       
        fetchData();  
    }, [nome])    
     
    
    return(
        <>            
            <Header></Header>
             {info && 
             <>
                <main className="flex flex-col w-screen items-center font-sedan">
                    <div className="border-b-2 w-1/4 my-5 ">
                        <h1 className="text-center text-5xl w-full">
                            {info["Nome"]}
                        </h1>
                    </div>
                    <div className="flex flex-col w-screen">
                        <div className="flex justify-around w-full border-2 border-orange-300">
                            <DivInfo value={info.Classe} title="Classe"></DivInfo> 
                            <DivInfo value={info.Raça} title="Raça" ></DivInfo>    
                            <DivInfo value= {info.Nivel} title="Nível"></DivInfo>  
                        </div>
                        <div className="flex w-full justify-between p-2">
                            <div className="w-1/2 flex items-center justify-center">
                                <img id="picture" className="w-1/3 h-1/2" src="" alt="Imagem do personagem" />
                            </div>
                            <div className="w-1/6 gap-1 flex flex-col">
                                <DivFicha title="Força" value={info.Status.Força} modify={info.Modificadores.Força}></DivFicha>
                                <DivFicha title="Destreza" value={info.Status.Destreza} modify={info.Modificadores.Destreza}></DivFicha>
                                <DivFicha title="Constituição" value={info.Status.Constituição} modify={info.Modificadores.Constituição}></DivFicha>
                                <DivFicha title="Carisma" value={info.Status.Carisma} modify={info.Modificadores.Carisma}></DivFicha>
                                <DivFicha title="Inteligência" value={info.Status.Inteligência} modify={info.Modificadores.Inteligência}></DivFicha>
                                <DivFicha title="Sabedoria" value={info.Status.Sabedoria} modify={info.Modificadores.Sabedoria}></DivFicha> 
                            </div>
                        </div>
                    </div>
                </main>
             </>
             }            
        </>
    )
}