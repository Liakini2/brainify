import {useEffect} from 'react';

export default function useKeyPress(keys, action) {
    useEffect(() => {
        function onKeyup(e) {
            if(keys.includes(e.key) || keys.includes(e.code)) {
                e.preventDefault();
                action(e.key ? e.key : e.code);
            }
        }
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [])
}