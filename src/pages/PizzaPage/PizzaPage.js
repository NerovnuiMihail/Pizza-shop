import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideHardCard from '../../components/InsideHardCard/InsideHardCard';

import './PizzaPage.css';

const PizzaPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("pizza");

    useEffect(() => {
        getRequest('http://localhost:3001/api/pizza');
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {
        const image = item.img.traditional;
        const description = item.additionally.default.slice().join(',');
        const cost = item.price[25];

        return <ExternalCard key={item.id} 
                Inside={InsideHardCard}
                {...item}
                image={image} 
                description={description} 
                cost={`от ${cost}`} 
                btnName="Выбрать" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="content-wrapper pizza-page">
            {head ? <h1>Часто заказывают:</h1> : null}
            <section className="pizza-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default PizzaPage;