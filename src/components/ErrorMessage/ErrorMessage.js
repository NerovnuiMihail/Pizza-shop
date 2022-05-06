import img from './error.gif';
import './ErrorMessage.css';

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <img src={img} alt="error" />
        </div>
    )
}

export default ErrorMessage;