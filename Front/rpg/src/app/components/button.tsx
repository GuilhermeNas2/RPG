class Butt{
    phrase: string | undefined
    func?: any | undefined 
    type?: any | undefined   
}

function Button(props: Butt){
    return(
        <button type={props.type} className="bg-gray-300 p-2 text-black rounded-sm hover:bg-gray-400" onClick={props.func}>{props.phrase}</button>
    )
}


export default Button