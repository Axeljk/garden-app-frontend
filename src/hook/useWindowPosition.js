import { useLayoutEffect,useState } from "react"

export default function useWindowPosition(id) {
    const [animation,setAnimation] = useState(false);

    useLayoutEffect(() => {
        function updatePosition() {
            const offsetHeight = window.document.getElementById(id).offsetHeight;
            if (window.pageYOffset > offsetHeight * 0.7) {
                setAnimation(true)
            }
        }
        window.addEventListener('scroll',updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll',updatePosition);
    }, [id]);
    return animation;
}