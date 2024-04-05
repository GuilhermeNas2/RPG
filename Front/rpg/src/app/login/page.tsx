"use client"

export default function Login() {

    async function sendData(event: { preventDefault: () => void }, user: string, key: string) {
        event.preventDefault()
        try{
            const result = await fetch(`http://127.0.0.1:5000/teste?user=${user}&key=${key}`, {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            })
            const data = await result.json()
            return data
        } catch {
            console.log("opa")
        }

       
    }
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        sendData(event,"Guilherme", "1234s")
    }

    return (
        <>
            <h1>Login</h1>
            <form action=""
            onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="">
                    Usuário
                    <input type="text"
                    placeholder="NbwanX9" />
                </label>
                <label htmlFor="">
                    Senha
                    <input type="password" 
                    placeholder="1234a"/>
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    )
}
