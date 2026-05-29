import { Icons } from "../../icons/IconLibrary";
export function Card({ title, description, icon, className }) {
  return (
    <div className={`bg-backgroundb rounded-lg pt-2 flex flex-col md:w-40 md:h-55 w-30 h-40 shadow-sm hover:shadow-md transition-shadow duration-200 select-none ${className}`}>
      <h3 className="font-semibold text-text text-[12px] md:text-base self-center md:w-auto w-14 mb-2 leading-tight ">{title}</h3>
      <div className="mb-3 self-center justify-center flex items-center content-end md:w-auto md:h-auto w-10 h-10">
        {icon}
      </div>
      <p className="text-text/50 text-[7px] md:text-sm grow self-center md:w-auto w-14">{description}</p>

    </div>
  );
}