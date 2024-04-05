"use client";

function Main() {    
    
   
  
    
    const sendStatus = async (event: {preventDefault: () => void;}) => {
        event.preventDefault();

        const response = await fetch('http://127.0.0.1:5000/postStatus', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({}),
        });
    }

    return(
        <main className="flex flex-col min-h-screen items-center justify-between p-24">     
                 
      </main>
    )
};

export default Main;