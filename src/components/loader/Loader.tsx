import { HashLoader, DotLoader,RotateLoader } from "react-spinners";
import "./loader.scss"

type LoaderProps = {
    loading: boolean,
    loaderType?: "hash" | "dot" | "rotate",
    color?: string,
    size?: number
}

const Loader = ({
    loading,
    loaderType = "hash",
    color = "white",
    size = 40
}: LoaderProps) => {

    if (loaderType === "hash")
        return (
            <>
                <HashLoader
                    className="loader"
                    aria-label="Loading spiner"
                    loading={loading}
                    color={color}
                    size={size}
                />
            </>
        )

    if (loaderType  ==="dot")
        return (
            <>
                <DotLoader
                    className="loader"
                    aria-label="Loading spiner"
                    loading={loading}
                    color={color}
                    size={size}
                />
            </>
        )


    if (loaderType === "rotate")
        return (
            <>
                <RotateLoader
                    className="loader"
                    aria-label="Loading spiner"
                    loading={loading}
                    color={color}
                    size={size}
                />
            </>
        )


}

export default Loader;