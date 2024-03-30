import Inputs from "./inputs";

class Teste{
    props?: string | undefined;
    title: string | undefined;
    nome:  string | undefined;
    param: any;
    holder: string | undefined; 
}

function Label(props: Teste) {
    return(
        <label htmlFor="" className="flex flex-col">
            {props.title}
            <Inputs nome={props.nome} param={props.param} holder={props.holder}/>
        </label>
    )
}


export default Label