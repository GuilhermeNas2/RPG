import Link from "next/link"

function Header(){
    return (
        <header>
            <div>
                TKD RPG
            </div>
            <Link href={{pathname: '/ficha', query: {nome:'Guilherme'}}}> Personagem </Link>   
        </header>
    )
}


export default Header