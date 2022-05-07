import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import BonusCard from '../../components/BonusCard/BonusCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './BonusActionsPage.css';

const BonusActionsPage = () => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/bonus');
         // eslint-disable-next-line
    }, []);

    const cards = !data.bonus ? null : data.bonus.map(({id, title, img, description, link}) => {

        return <BonusCard key={id} 
                img={img} 
                title={title}
                description={description} 
                link={link} />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="content-wrapper bonus-page">
            <section className="bonus-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default BonusActionsPage;