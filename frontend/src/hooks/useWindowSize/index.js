import { useEffect, useState } from "react"

export const UserWindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth]);
        }
        window.addEventListener("resize", handleResize);
    }, [])

    return {
        height: size[0],
        width: size[1],
    };
}