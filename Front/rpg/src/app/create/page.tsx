"use client"
import { useEffect, useState } from "react";

import { Label, LabelInfo } from "../components/label";
import Button from "../components/button";
import { Header } from "../components/header";
import { promises } from "dns";



export default function createChar() {

    const [nome, setNome] = useState('');
    const [classe, setClasse] = useState('');
    const [number, setNumber] = useState('');
    const [raça, setRaça] = useState('');
    const [nivel, setNivel] = useState(0);

    const [str, setStr] = useState('');
    const [des, setDes] = useState('');
    const [char, setChar] = useState('');
    const [int, setInt] = useState('');
    const [sab, setSab] = useState('');
    const [cons, setCons] = useState('');    
    
    const [path, setPath] = useState('')
    const [classItem, setClassItem] = useState([]);
    const [classMagic, setclassMagic] = useState([]);
    const [magicDisc, setmagicDisc] = useState<any>([]);
    const [raçaItem, setRaçaItem] = useState([]);
    const [skills, setSkills] = useState([]);    
    const [selectedItems, setSelectedItems] = useState<any>([]);    
    const [geralMagic, setGeralMagic] = useState<any>([]);
    const [geralDisc, setgeralDisc] = useState<any>([]);

    let user = JSON.parse(localStorage.getItem('data'))  
    user = user.id

    const handleFile = async (e:any) => {
        const file = e.target.files[0];
        setPath(file)       

        const path = URL.createObjectURL(file);
        const picture = document.getElementById('picture') as HTMLImageElement;    

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
                setSkills(data.mensagem.Habilidades);

            } catch {
                console.log('error')
            };
        };
        fetchData();
    },[]);

    useEffect(() => {
        async function fetchData(){
            try{                
                const response = await fetch(`http://127.0.0.1:5000/getClasseMagic?class=${classe}&level=${nivel}`, {
                method: 'GET',
                headers: {
                    "Content-type" : "application/json"
                    }
                });

                const data = await response.json();                
                
                setmagicDisc(data.magias.nome);    
                setclassMagic(data.magias.descricao) 
                setGeralMagic(data.magias.nGerais);
                setgeralDisc(data.magias.descriGerais)          
               

            } catch {
                console.log('error')
            };
        };

        if(classe != "" && nivel >= 1){
            fetchData();
        }
        
    },[classe,nivel]);
   
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
            body: JSON.stringify({"persona":{nome, classe, nivel, raça, user},"status":{ str,int,des,char,cons,sab}, "skills":{selectedItems}}),
        });

        const data = await response.json();
        loadImage(data.mensagem[0]);
       
    };  

    const selectSkills:React.MouseEventHandler<HTMLLIElement> = (event) => {               
        let li = event.currentTarget;      
        let data = event.currentTarget.textContent;
         
        const index = selectedItems.indexOf(data);
        if (index > -1) {        
            setSelectedItems(selectedItems.filter((x: string | null) => x !== data));
            li.className = '';
        } else {        
            setSelectedItems([...selectedItems, data]);
            li.className = 'bg-gray-300 text-black'; 
        };

        return
    }; 


    // window.addEventListener('scroll', function() {
    //     var fixedElement = document.getElementById('perfil');
    //     var content = document.querySelector('main');

    //     if(content && fixedElement){
    //          var contentRect = content.getBoundingClientRect();

    //          if (window.pageYOffset >= contentRect.top) {
    //             fixedElement.classList.add('fixed');
    //           } else {
    //             fixedElement.classList.remove('fixed');
    //           }
    //     }        
    //   });

      const modal = document.createElement('div');
      const span = document.createElement('h3');
      const paragrafh = document.createElement('p');
      

      const openModal = (key:any, index:number):React.MouseEventHandler<HTMLDivElement> => {
        return () => {
            const divpai = document.querySelector('#listMagic')
            
            modal.setAttribute('id', 'modal'); 
           
            
            span.innerText = key
            paragrafh.innerText = classMagic[index]
            modal.appendChild(span);
            modal.appendChild(paragrafh);
            
            divpai?.appendChild(modal);

            if(modal){ 
                modal.className = 'block w-1/2 h-1/2 bg-gray-200 border-2 border-black absolute top-1/2 right-50 z-10 flex flex-col items-center p-3'
                span.className = 'font-2xl border-b-2 border-black'
            };
        };
      };

      const closemodal = () => {
          
            if(modal){             
                modal.className = 'hidden'
                span.innerText = ''
                paragrafh.innerText = ''
            };
        
      };

      const getMagicList = () => {
       
      }           
           

    return (
        <>
            <Header></Header>
            <main className="font-sedan text-black text-xl" >
                <form action=""
                onSubmit={sendData}
                className="w-full flex flex-col">
                    <div id='perfil' className="w-full bg-white h-25 flex border-2">   
                        <LabelInfo title="Nome" nome={nome} param={(e:any) => setNome(e.target.value)} holder="Nome" type="text"></LabelInfo> 
                        <LabelInfo htmlElement={
                            <>
                                <span>Classe</span>
                                <select name="Classe" id="" className="bg-slate-200  w-1/2" onChange={(event) => handleSelect(event,1)}>
                                    <option value=''></option>
                                    {classItem && classItem.map((classe: string) => <><option value={classe} className="">{classe}</option></>
                                    )}
                                </select>
                            </>}>                            
                        </LabelInfo>   
                        <LabelInfo htmlElement={
                            <>
                                <span>Raça</span>
                                <select name="Raça" id="" className="bg-slate-200 w-1/2" onChange={(event) => handleSelect(event,2)}>
                                    <option value=''></option>
                                    {raçaItem && raçaItem.map((race: string) => <><option value={race} className="">{race}</option></>
                                    )}
                                </select>
                            </>}>                            
                        </LabelInfo>  
                        <LabelInfo title="Nivel" nome={nivel} param={(e:any) => setNivel(e.target.value)} holder="Nivel" type="number"></LabelInfo>                                              
                    </div>
                    <div className="flex bg-white justify-around p-2">
                        <div className="text-center ">
                            <h2 className="text-2xl border-b-2 border-black">Habilidades</h2>
                            <ul className="cursor-pointer my-2">
                                {skills && skills.map((key) => <li id="SK" className="" value={key} onClick={selectSkills}>{key}</li>)}
                            </ul>
                        </div>
                        <div className="w-1/2 flex flex-col items-center border-2">
                           <h2 className="text-3xl border-b-2 border-black">Foto</h2>
                            <div id="profilePicture" className=" w-1/2 h-1/2 p-2 flex items-center justify-center">
                                <img id="picture" className="w-1/2 h-1/2" alt="" />
                            </div>
                            <label htmlFor="">
                                <input type="file" id="teste" className="border-2" onChange={handleFile}/>                                                               
                            </label>                            
                        </div>
                        <div className="flex flex-col h-96 justify-center items-center">
                            {number ? <span className="">{number}</span> : <span className="">0</span> }
                            <Button type="button" phrase="Rolar Dados" func={rollDice}></Button>
                        </div>
                        <div className="w-1/5 items-center flex flex-col" >
                        <h2 className="border-b-2 border-black mb-5">Status</h2>         
                            <Label title="Força" nome={str} param={(e:any) => setStr(e.target.value)} holder="Força" type="number"></Label>
                            <Label title="Destreza" nome={des} param={(e:any) => setDes(e.target.value)} holder="Destreza" type="number"></Label>
                            <Label title="Constituição" nome={cons} param={(e:any) => setCons(e.target.value)} holder="Constituição" type="number"></Label>
                            <Label title="Carisma" nome={char} param={(e:any) => setChar(e.target.value)} holder="Carisma" type="number"></Label>
                            <Label title="Inteligência" nome={int} param={(e:any) => setInt(e.target.value)} holder="Inteligência" type="number"></Label>
                            <Label title="Sabedoria" nome={sab} param={(e:any) => setSab(e.target.value)} holder="Sabedoria" type="number"></Label> 
                        </div>
                    </div>   
                    <div className="flex flex-col items-center w-content mb-10 bg-white">
                        <div className="bg-white p-2 w-max ">
                            <h2 className="text-3xl" >Mágias</h2>
                        </div>
                        <div className="flex w-5/6 text-center justify-around border-t-2 p-2">
                            <div id="listMagic" >
                                <span className="text-2xl">Especificas</span>
                                {
                                    magicDisc && nivel >=1 && magicDisc.map(
                                        (key:any, index:number) => 
                                        <div onMouseOver={openModal(key,index)} onMouseOut={closemodal} className="my-2">
                                            {key}
                                        </div>)
                                }                 
                            </div> 
                            <div className="flex flex-col">
                                <span className="text-2xl">Gerais</span>
                                <button type="button" onClick={getMagicList}>Escolher</button>
                            </div>       
                        </div>                       
                    </div>                    
                    <Button type="submit" phrase="Enviar"></Button>                  
                </form>
          </main>
         </>
    )
}