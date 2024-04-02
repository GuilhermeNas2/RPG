import Inputs from "./inputs";

class Teste{
    props?: string | undefined;
    title: string | undefined;
    nome:  string | undefined;
    param: any;
    holder: string | undefined; 
}

export const Label = (props: Teste) => {
    return(
        <label htmlFor="" className="flex flex-col bg-slate-50 mb-8 p-1 h-24 w-1/2 text-zinc-950 text-center rounded-md items-center gap-1">
            {props.title}
            <Inputs nome={props.nome} param={props.param}/>
            <span className="border border-slate-950 w-10 rounded-md">A</span>
        </label>
    )
}

export const LabelInfo = (props: Teste) => {
    return(
        <label htmlFor="" className="flex flex-col bg-black mb-8 p-1 h-24 w-1/2 text-zinc-950 text-center rounded-md items-center gap-1">
            {props.title}
            <Inputs nome={props.nome} param={props.param}/>            
        </label>
    )
}

