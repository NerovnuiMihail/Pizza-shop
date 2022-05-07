import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';

import './DessertPage.css';

const DessertPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/dessert');
         // eslint-disable-next-line
    }, []);

    const cards = !data.dessert ? null : data.dessert.map(({id, name, img, description, price, weight}) => {
        return <ExternalCard key={id} 
                Inside={InsideCard}
                weight={`${weight} грамм`}
                img={img} 
                title={name}
                description={description} 
                cost={price} 
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