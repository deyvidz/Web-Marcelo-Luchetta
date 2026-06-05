import WhatsappCta from '../components/features/WhatsappCta.jsx';

// Hitos de la trayectoria. Cada item tiene año, título y descripción breve.
// Si en el futuro querés agregar/quitar, editás este array y el render se adapta.
const TIMELINE = [
    {
        year: 'Inicio',
        title: 'Vendedor y editor de libros odontológicos',
        description: 'Recorrido por el sector que me dio un nombre conocido en el ámbito odontológico argentino, forjando vínculos con profesionales de todo el país.',
    },
    {
        year: '2019',
        title: 'Distribuidor oficial de Kytinon',
        description: 'Ante la imposibilidad de seguir importando libros, viré hacia las membranas Kytinon, un producto nacional que se convirtió en mi línea principal.',
    },
    {
        year: '2026',
        title: 'Nace el proyecto web',
        description: 'Junto a mi hijo David lanzamos este sitio para acercar el catálogo a los profesionales de todo el país, con atención personalizada y respaldo técnico real.',
    },
];

export default function About() {
    return (
        <div className="min-h-screen py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <header className="text-center mb-16 md:mb-20">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text mb-4 tracking-tight">
                        Quién soy
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-lg md:text-xl text-gray max-w-2xl mx-auto">
                        Conoce mi historia, misión y compromiso con la excelencia
                        en equipamiento odontológico.
                    </p>
                </header>

                {/* Bio: foto a la izquierda, datos a la derecha */}
                <section className="bg-backgroundb rounded-2xl shadow-sm p-8 md:p-12 mb-16 md:mb-20 border border-backgroundc">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        {/* Foto */}
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg ring-4 ring-backgroundc shrink-0 bg-backgroundc">
                            <img
                                src="https://scontent.faep11-2.fna.fbcdn.net/v/t39.30808-6/502515000_24183448674592763_2634108901626095136_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ZG_-UFj0C3MQ7kNvwEAU99b&_nc_oc=Adp593Eiu7CeAtiuRSBgkdDEYVeSEV6GgE5wYhjKqIUwW0uvlKwKF-dhMwNyffYwaE4&_nc_zt=23&_nc_ht=scontent.faep11-2.fna&_nc_gid=Y30wK3eQwaafCnZPhRfh3A&_nc_ss=7b289&oh=00_Af8LZqYFSbMdMJb9HQQLrXn1AGDGqn-unnPorTN-w44NVQ&oe=6A28D615"
                                alt="Marcelo Luchetta"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Datos */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-text mb-2">
                                Marcelo Luchetta
                            </h2>
                            <p className="text-lg md:text-xl text-primary font-semibold mb-6">
                                Vendedor y Editor
                            </p>
                            <p className="text-text/80 leading-relaxed text-base md:text-lg">
                                Más de 30 años en el sector odontológico. Fundé este
                                proyecto con la misión de proporcionar productos de
                                alta calidad a profesionales de toda Argentina, con
                                atención personalizada y respaldo técnico real.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Timeline de trayectoria */}
                <section className="mb-16 md:mb-20">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-text text-center mb-12">
                        Mi trayectoria
                    </h2>

                    <ol className="relative border-l-2 border-primary/30 md:ml-6 ml-4 space-y-10">
                        {TIMELINE.map((item) => (
                            <li key={item.year} className="pl-6 md:pl-10 relative">
                                {/* Punto en la línea */}
                                <span
                                    className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-background"
                                    aria-hidden="true"
                                />

                                <span className="inline-block text-sm font-bold text-primary uppercase tracking-wider mb-1">
                                    {item.year}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold text-text mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-text/80 leading-relaxed">
                                    {item.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* CTA: "Si necesitás algo, contactame" */}
                <WhatsappCta title="¿Buscás un producto específico?">
                    Contactame y te ayudo a encontrar el equipamiento
                    ideal para tu consultorio.
                </WhatsappCta>

            </div>
        </div>
    );
}
