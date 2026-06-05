import { Card } from "./Card";
import { Icons } from "../../icons/IconLibrary";
export function CardList() {
    return (
        <div className='absolute top-10 md:top-25 w-full h-full flex items-end justify-center gap-10 text-center pointer-events-none z-10'>
            <Card title="Envios a domicilio" description="A todo el pais, puerta a puerta" link="Ver más" icon={<Icons.Envios className="w-14 h-14" />} />
            <Card title="Atención al cliente" description="Atención personalizada al instante" link="Ver más" icon={<Icons.Atencion className="w-14 h-14" />} />
            <Card title="Medios de pago" description="Efectivo o Transferencia bancaria" link="Ver más" icon={<Icons.Pagos className="w-14 h-14" />} />
            <Card title="Categorias ‎  " description="Descubrí nuestra amplia gama de productos" link="Ver más" icon={<Icons.Categoria className="w-14 h-14" />} className='hidden md:block' />
        </div>
    );
}