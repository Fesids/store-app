// por algum motivo o retorno da pesquisa por criteria está vindo com os campos iniciados em underscore, por isso criei essa função... 
// sim, estou com preguiça de resolver esse problema agora, faz parte da vida.
export const removeUnderscores = (data: any): any=>{
    if (Array.isArray(data)) {
        return data.map(item => removeUnderscores(item));
    }
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key.startsWith('_') ? key.slice(1) : key,  
            value
        ])
    );
}

export const removeUnderscoresFromPaginated = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(item => removeUnderscores(item));
    }

    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key.startsWith('_') ? key.slice(1) : key,
                removeUnderscoresFromPaginated(value)  
            ])
        );
    }

    return data;
};
