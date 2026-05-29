import { Link } from "react-router-dom";
import { Icons } from "../../icons/IconLibrary.jsx";
export function GridCard({ img, titulo, type, className }) {
    return (
        <div className={`group bg-gray-100 relative flex justify-center items-center rounded-2xl ${className} `}>
            <div className="w-full h-full overflow-hidden rounded-2xl"><img src={img} alt={titulo} className="w-full h-full  rounded-2xl shadow-2xl object-cover overflow-hidden group-hover:scale-102 duration-300" /></div>
            <Link to={`/productos?${type}=${titulo}`} className="group text-lg absolute w-full h-full bg-gray/70 hover:bg-gray/50 duration-300 rounded-2xl flex items-center justify-center p-5 font-semibold">
                <span className=" inline-flex items-center gap-2  text-white ">
                    {titulo}
                    <Icons.ArrowIcon className="w-4 h-4 group-hover:translate-x-1 duration-300" />
                </span>
            </Link>
        </div>
    )
}