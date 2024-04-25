class Teste{
    nome: string | number | undefined;
    param: any | undefined;
    type: string | undefined
}

export const Inputs = (props: Teste) => {

    return(        
            <input type={props.type}               
            value={props.nome}
            onChange={props.param}
            className={props.type == "number" ? 'text-zinc-950 text-center p-1 border-none outline-none w-1/2' : 'text-zinc-950 p-1 text-start border-none outline-none w-3/4'}
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