// For some reason, the search result by criteria is coming with fields starting with an underscore, so I created this function... 
// Yes, I'm too lazy to solve this problem right now, it's part of life.

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
