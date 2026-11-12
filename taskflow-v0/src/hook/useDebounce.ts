import { useEffect, useState } from "react";

// renvoie la valeur seulement quand on arrete de taper pendant `delay` ms
export function useDebounce<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        // si value change avant la fin, on annule le timer
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
