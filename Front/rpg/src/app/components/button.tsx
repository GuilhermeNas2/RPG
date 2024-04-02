class Butt{
    title: string | undefined
}

function Button(props: Butt){
    return(
        <button type="submit" className="bg-lime-300 p-1 text-black rounded-sm">{props.title}</button>
    )
}


export default Button