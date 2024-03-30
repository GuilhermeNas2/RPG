class Teste{
    nome: string | undefined;
    param: any | undefined;
    holder: string | undefined;
}

function Inputs(props: Teste) {

   
    return(        
            <input type="text" 
            placeholder={props.holder}   
            value={props.nome}
            onChange={props.param}
            className="text-zinc-950"
             />
       
    )
}


export default Inputs;