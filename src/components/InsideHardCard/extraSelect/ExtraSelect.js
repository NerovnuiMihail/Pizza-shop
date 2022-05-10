import { useEffect } from 'react';
import ExtraSelectItem from './ExtraSelectItem';
import useApiData from '../../../services/useApiData';
import Skeleton from '../../skeleton/Skeleton';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './ExtraSelect.css';

const ExtraSelect = () => {
    const [data, loading, error, getRequest] = useApiData("extra");

    useEffect(() => {
        getRequest("http://localhost:3001/api/extra");
        // eslint-disable-next-line
    }, []);

    const errorMessage = error ? <ErrorMessage classes={{paddingTop: "20px", width: "400px", height: "auto"}} /> : null;
    const loadingData = loading ? <Skeleton classes={{width: "100px", height: "auto"}} wrapp={{paddingTop: "20px", paddingLeft: "20px"}} /> : null;

    const content = !data ? null : (data.map((item) => <ExtraSelectItem key={item.id} {...item} /> ));

    return (
        <div className="extra-select-wrapper">
            <h2 className="extra-select__title">Добавить в пиццу</h2>
            {errorMessage}
            {loadingData}
            <div className="extra-select__cards">
                {content}
            </div>
        </div>
    );
}

export default ExtraSelect;