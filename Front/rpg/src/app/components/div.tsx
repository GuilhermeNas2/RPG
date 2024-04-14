class Teste {
    title: string | undefined 
    value: string | number | undefined 
    modify: number | undefined
}

export default function DivFicha(props: Teste) {
    return(
        <div className="bg-orange-200 flex flex-col">
            <span>{props.title}</span>
            {props.value}     
            <div>
                <span>{props.modify}</span>
            </div>               
        </div>  
    )
}