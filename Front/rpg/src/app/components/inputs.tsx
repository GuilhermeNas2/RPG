class Teste{
    nome: string | undefined;
    param: any | undefined;
    type: string | undefined
}

export const Inputs = (props: Teste) => {

    return(        
            <input type={props.type}               
            value={props.nome}
            onChange={props.param}
            className="text-zinc-950 text-center border-none outline-none w-1/2"
             />
       
    )
}

export const InputsLogin = (props:Teste) => {
    return(        
        <input type={props.type}               
        value={props.nome}
        onChange={props.param}
        className="text-zinc-950 bg-slate-100 outline-none p-1"
        required        
         />
   
    )
}