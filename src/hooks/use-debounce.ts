import {useEffect, useState } from 'react'; 


export const useDebounce = (value: string, milliSeconds: number) => {
    const [debounceValue, setDebounceValue] = useState(value); 

    useEffect(() => { 
        const handler = setTimeout(() =>{ 
            setDebounceValue(value);
        }, milliSeconds); 

        return () =>{ 
            clearTimeout(handler); 
        }; 
    }, [value, milliSeconds]);

    return debounceValue;
}
