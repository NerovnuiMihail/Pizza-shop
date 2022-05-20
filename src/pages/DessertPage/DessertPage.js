import { useEffect, useRef } from 'react';
import {Helmet} from "react-helmet";
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import useApiPopular from '../../services/useApiPopular';

import './DessertPage.css';

const DessertPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("dessert");
    const [popular, isLoading, isError, getPopular] = useApiPopular("dessert");
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
        getRequest('http://localhost:3001/api/dessert');
        getPopular();
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {
        return <ExternalCard key={item.id} 
                {...item}
                pageName="dessert"
                Inside={InsideCard}
                weight={`${item.weight} грамм`}
                btnName="В корзину" />
    });

    const popularCards = !popular ? null : (
        popular.map(item => {
            return (
                <PopularCard key={item.id} 
                    Inside={InsideCard} 
                    data={data} 
                    pageName="dessert" 
                    item={item} />
            );
        })
    );

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Замечательные и вкуснейшие десерты от наших поваров!"
                />
                <title>Десерты</title>
            </Helmet>

            <main ref={bodyRef} className="dessert-page content-wrapper">
                            {!head ? null : (
                                    <div className="dessert-page__popular">
                                        <h1>Часто заказывают:</h1>
                                        <div className="dessert-popular">
                                            {popularCards}
                                        </div>
                                    </div>
                            )}

                <section className="dessert-content">
                    {errorMessage}
                    {loadingData}
                    {cards}
                </section>
            </main>
        </>
    )
}

export default DessertPage;