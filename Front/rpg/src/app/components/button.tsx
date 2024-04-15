class Butt{
    phrase: string | undefined
    func?: any | undefined 
    type?: any | undefined   
}

function Button(props: Butt){
    return(
        <button type={props.type} className="bg-lime-300 p-1 text-black rounded-sm" onClick={props.func}>{props.phrase}</button>
    )
}


export default Button