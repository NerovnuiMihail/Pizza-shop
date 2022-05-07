import ReactDOM from 'react-dom';
import './Portal.css';

const Portal = (props) => {
    const node = document.querySelector('#modal-root');

    return ReactDOM.createPortal(props.children, node);
}

export default Portal;