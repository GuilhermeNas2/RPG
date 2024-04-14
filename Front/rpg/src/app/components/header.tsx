import Link from "next/link"


function Header(){


    return (
        <>
            <header className="flex justify-between p-5 bg-yellow-900 h-16">
                <div>
                    TKD RPG
                </div>
                <ol className="flex gap-10">
                    <li><Link href={{ pathname: '/home' }}> Home </Link> </li>
                    <li><Link href={{ pathname: '/ficha', query: { nome: 'Guilherme' } }}> Personagens </Link> </li>
                    <li><Link href={{ pathname: '/create' }}> Criar </Link> </li>
                </ol>
            </header>           
        </>
    )
}


export default Header