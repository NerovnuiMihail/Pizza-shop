import './ExternalCard.css';

const ExternalCard = ({img, title, description, cost, btnName, contentHeight}) => {
    return (
        <div className="ExternalCard" style={{height: contentHeight ? contentHeight : ""}}>
            <div className="ExternalCard__main">
                <div className='ExternalCard__img'>
                    <img src={img} alt={title} />
                </div>
                <h2>{title}</h2>
                <p className='ExternalCard__description'>{description}</p>
            </div>
            <div className='ExternalCard__footer'>
                <p className='ExternalCard__cost'>{cost} &#x20bd; </p>
                <button>{btnName}</button>
            </div>
        </div>
    )
}

export default ExternalCard;