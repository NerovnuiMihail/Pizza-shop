import { useEffect,useRef } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import useApiPopular from '../../services/useApiPopular';

import './DrinksPage.css';

const DrinksPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("drinks");
    const [popular, isLoading, isError, getPopular] = useApiPopular("drinks");
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
        getRequest('http://localhost:3001/api/drinks');
        getPopular();
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {

        return <ExternalCard key={item.id} 
                Inside={InsideCard}
                pageName="drinks"
                {...item}
                weight={`${item.weight} литра`}
                btnName="В корзину" />
    });

    const popularCards = !popular ? null : (
        popular.map(item => {
            return (
                <PopularCard key={item.id} 
                    Inside={InsideCard} 
                    data={data} 
                    pageName="drinks" 
                    item={item} />
            );
        })
    );

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main ref={bodyRef} className="drinks-page content-wrapper">
                        {!head ? null : (
                                <div className="drinks-page__popular">
                                    <h1>Часто заказывают:</h1>
                                    <div className="drinks-popular">
                                        {popularCards}
                                    </div>
                                </div>
                        )}

            <section className="drinks-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default DrinksPage;