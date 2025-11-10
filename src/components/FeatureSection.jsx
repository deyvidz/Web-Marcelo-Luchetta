export default function FeatureSection({ title, description, icon }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {title}
            </h3>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    )
};