import './InsideExtraSmallCard.css';


const InsideExtraSmallCard = ({img, name}) => {
    return (
        <div className="inside-extra-small-card">
            <img src={img} alt={name} />
            <p>{name}</p>
        </div>
    );
}

export default InsideExtraSmallCard;