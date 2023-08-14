function extraiLinks(arrLinks){
    arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus (listaURLs) {
    const arrStatus = await Promise.all(
        
    )
    return listaURLs.map(async(url) => {
        const response = await fetch(url) 
        return response.status;
    })
}

export default function listaValidada (listaDeLinks){
    const Links = extraiLinks(listaDeLinks);
    const status = checaStatus(Links); 
    console.log(status);
    return status;
}
