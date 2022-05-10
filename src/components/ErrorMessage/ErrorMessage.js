import img from './error.gif';
import './ErrorMessage.css';

const ErrorMessage = ({classes}) => {
    return (
        <div className="error-message">
            <img src={img} alt="error" style={classes ? classes : null} />
        </div>
    )
}

export default ErrorMessage;