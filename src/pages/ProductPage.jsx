import { useParams } from 'react-router-dom';
import {products} from '../data/products.js';
export default function ProductPage() {
    const { id } = useParams();
    const product = products.find(product => product.id === parseInt(id));
    return (
        <div>
            <h1>ProductSection {product.id}</h1>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <p>{product.description}</p>
        </div>
    )
}