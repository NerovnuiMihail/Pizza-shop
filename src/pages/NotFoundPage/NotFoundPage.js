import { useLocation, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

import notfound from './404.png';

import './NotFoundPage.css';

const NotFoundPage = () => {
    const location = useLocation();

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Неизвестная страница"
                />
                <title>Страница не найдена</title>
            </Helmet>
            
            <div className="not-found">
                <img src={notfound} alt="notfound" />

                <h1>Страница <span>{location.pathname ? location.pathname : null}</span> не найдена</h1>
                <Link to="/">
                    <h2>Перейти на главную</h2>
                </Link>
            </div>
        </>
    )
}

export default NotFoundPage;