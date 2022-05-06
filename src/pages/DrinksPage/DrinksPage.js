import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './DrinksPage.css';

const DrinksPage = () => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/drinks');
         // eslint-disable-next-line
    }, []);

    const cards = !data.drinks ? null : data.drinks.map(({id, name, img, description, price}) => {

        return <ExternalCard key={id} 
                contentHeight="500px"
                img={img} 
                title={name}
                description={description} 
                cost={price} 
                btnName="В корзину" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="drinks-page content-wrapper">
            <h1>Часто заказывают:</h1>
            <section className="drinks-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default DrinksPage;