import { useParams } from 'react-router-dom';

export default function ProductSection() {
    const {id} = useParams();
    console.log({id});
    return (
        <div>
            <h1>ProductSection {id}</h1>
        </div>
    )
}