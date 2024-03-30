class Butt{
    title: string | undefined
}

function Button(props: Butt){
    return(
        <button type="submit">{props.title}</button>
    )
}


export default Button