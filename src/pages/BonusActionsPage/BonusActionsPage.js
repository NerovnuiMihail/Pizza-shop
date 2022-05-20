import { useEffect, useRef } from 'react';
import {Helmet} from "react-helmet";
import useApiData from '../../services/useApiData';
import BonusCard from '../../components/BonusCard/BonusCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './BonusActionsPage.css';

const BonusActionsPage = () => {
    const [data, loading, error, getRequest] = useApiData("bonus");
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
        getRequest('http://localhost:3001/api/bonus');
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {

        return <BonusCard key={item.id} {...item} />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Наши активные акции и скидки, а так же бонусы при покупках!"
                />
                <title>Актуальные бонусы и акции</title>
            </Helmet>
        
            <main ref={bodyRef} className="content-wrapper bonus-page">
                <section className="bonus-content">
                    {errorMessage}
                    {loadingData}
                    {cards}
                </section>
            </main>
        </>
    )
}

export default BonusActionsPage;