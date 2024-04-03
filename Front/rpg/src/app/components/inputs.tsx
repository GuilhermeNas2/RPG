class Teste{
    nome: string | undefined;
    param: any | undefined;
    type: string | undefined
}

function Inputs(props: Teste) {

   
    return(        
            <input type={props.type}               
            value={props.nome}
            onChange={props.param}
            className="text-zinc-950 text-center border-none outline-none w-1/2"
             />
       
    )
}

export default Inputs;