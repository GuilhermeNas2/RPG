import {Inputs, InputsLogin} from "./inputs";

class Teste{
    props?: string | undefined;
    title?: string | undefined;
    nome?:  string | number | undefined;
    param?: any;
    holder?: string | undefined; 
    type?: string | undefined;  
    htmlElement?: any | undefined;  
 }

export const Label = (props: Teste, children: React.Component) => {
    return(

        <label htmlFor="" className="flex flex-col bg-slate-200 mb-8 p-1 h-20 w-1/2 text-zinc-950 text-center rounded-md items-center gap-1">
            {props.holder != null ? 
                <>
                    {props.title}
                    <Inputs nome={props.nome} param={props.param} type={props.type}/>                    
                </> 
                : 
                <>                    
                    {children}
                </>
            }
        </label>
    )
}

export const LabelInfo = (props: Teste) => {
    return(
        <label htmlFor="" className="flex flex-col bg-slate-200 px-2 h-24 w-1/2 text-zinc-950 text-center border-b-2 border-black items-start gap-1">
            {props.holder != null ? 
                <>
                    {props.title}
                    <Inputs nome={props.nome} param={props.param} type={props.type}/> 
                </>       
                : 
                <>
                    {props.htmlElement}
                </>
            }        
        </label>
    )
}


export const LabelLogin = (props: Teste) => {
    return (
        <label htmlFor="" className="flex flex-col mb-8 p-1 h-24 w-3/5 text-zinc-950 text-start gap-1">
            {props.title}
            <InputsLogin nome={props.nome} param={props.param} type={props.type}/>            
        </label>
    )
}
