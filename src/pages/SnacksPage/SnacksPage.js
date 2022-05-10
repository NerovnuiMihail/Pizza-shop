import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';

import './SnacksPage.css';

const SnacksPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("snacks");

    useEffect(() => {
        getRequest('http://localhost:3001/api/snacks');

         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {

        return <ExternalCard key={item.id} 
                Inside={InsideCard}
                pageName="snacks"
                {...item}
                weight={`${item.weight} грамм`}
                btnName="В корзину" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="snacks-page content-wrapper">
            {head ? <h1>Часто заказывают:</h1> : null}
            <section className="snacks-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default SnacksPage;