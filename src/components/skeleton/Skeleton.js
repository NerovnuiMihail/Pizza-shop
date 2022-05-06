import img from './skeleton-loading.gif';

import './Skeleton.css';

const Skeleton = () => {
    return (
        <section className="skeleton-wrapper">
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
            <img src={img} alt="downloadimage" className="skeleton" />
        </section>
    )
}

export default Skeleton;