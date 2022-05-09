import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';

import './DessertPage.css';

const DessertPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("dessert");

    useEffect(() => {
        getRequest('http://localhost:3001/api/dessert');
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {
        return <ExternalCard key={item.id} 
                {...item}
                Inside={InsideCard}
                weight={`${item.weight} грамм`}
                btnName="В корзину" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="dessert-page content-wrapper">
            {head ? <h1>Часто заказывают:</h1> : null}
            <section className="dessert-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default DessertPage;