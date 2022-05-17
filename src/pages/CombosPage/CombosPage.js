import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import CombosInsideCard from '../../components/CombosInsideCard/CombosInsideCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './CombosPage.css';

const CombosPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("combos");

    useEffect(() => {
        getRequest('http://localhost:3001/api/combos');
        // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {
                                                return <ExternalCard key={item.id} 
                                                        Inside={CombosInsideCard}
                                                        pageName="combos"
                                                        {...item}
                                                        name={item.title}
                                                        img={item.imgPreview}
                                                        price={item.startPriceWithSale}
                                                        description={item.description}
                                                        weight={`${item.weight} грамм`}
                                                        btnName="Выбрать" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <div className="combos-page content-wrapper" style={head ? {paddingTop: "150px"} : null}>

            {cards}
            {loadingData}
            {errorMessage}

        </div>
    )
}

export default CombosPage;