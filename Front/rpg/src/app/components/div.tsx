class Teste {
    title?: string | undefined 
    value: string | number | undefined 
    modify?: number | undefined
}

export function DivFicha(props: Teste) {
    return(
        <div className="h-1/6 w-1/2 flex flex-col items-center gap-1 text-center border-2 border-orange-200 p-1 rounded-md hover:bg-orange-300 hover:text- hover:scale-125">
            <span className="w-fit border-b-2">{props.title}</span>
            {props.value}     
            <div className="border-2 rounded-xl p-2 w-2/10 mb-2 text-center">
                <span>{props.modify}</span>
            </div>               
        </div>  
    )
}


export function DivInfo(props: Teste) {
    return(
        <div className="flex flex-col">
            <h2 className="text-xl">{props.title}</h2>
                {props.value}                      
        </div> 
    )
}