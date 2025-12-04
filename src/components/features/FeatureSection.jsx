export default function FeatureSection({ title, description, icon }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 border border-gray-100 group">
            <div className="text-5xl md:text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-200">
                {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {description}
            </p>
        </div>
    )
};