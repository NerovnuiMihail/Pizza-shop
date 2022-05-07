import { Link } from 'react-router-dom';
import './BonusCard.css';

const BonusCard = ({title, img, description, link}) => {
    return (
        <section className="bonus-card">
            <img src={img} alt={title} />
            <div className="bonus-card__descr">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            {link ? <Link to={link}><button>Посмотреть</button></Link> : null}
        </section>
    )
}

export default BonusCard;