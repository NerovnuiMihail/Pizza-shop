import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';

import './DrinksPage.css';

const DrinksPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/drinks');
         // eslint-disable-next-line
    }, []);

    const cards = !data.drinks ? null : data.drinks.map(({id, name, weight, calories, img, description, price}) => {

        return <ExternalCard key={id} 
                Inside={InsideCard}
                calories={calories}
                img={img} 
                weight={`${weight} литра`}
                title={name}
                description={description} 
                cost={price} 
                btnName="В корзину" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="drinks-page content-wrapper">
            {head ? <h1>Часто заказывают:</h1> : null}
            <section className="drinks-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default DrinksPage;