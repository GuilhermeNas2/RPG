import Link from "next/link"


export const Header = () => {
    return (
        <>
            <header className="flex justify-between p-5 bg-gray-400 text-black h-16">
                <div className="w-1/12 h-1/12 flex items-center">
                    <img src="/logo.png" alt="" className="w-fit h-10" />
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


export const  HeaderHome = () => {
    return (
        <>
            <header className="flex justify-between p-5 bg-yellow-900 h-16">
                <div>
                    TKD RPG
                </div>
                <ol className="flex gap-10">
                    <li><Link href={{ pathname: '/login' }}> Login</Link> </li>                    
                </ol>
            </header>           
        </>
    )

}