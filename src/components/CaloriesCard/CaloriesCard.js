import './CaloriesCard.css';

const CaloriesCard = ({calories: {carbohydrates, energi, fats, protein}}) => {
    return (
        <div className="calories-card">
            <h3>Пищевая ценность на 100г:</h3>
            <ul>
                <li> <span>Энерг.ценность:</span> <span>{energi} ккал</span> </li>
                <li> <span>Белки:</span> <span>{protein} грамм</span> </li>
                <li> <span>Углеводы:</span> <span>{carbohydrates} грамм</span> </li>
                <li> <span>Жиры:</span> <span>{fats} грамм</span> </li>
            </ul>
        </div>
    );
}

export default CaloriesCard;