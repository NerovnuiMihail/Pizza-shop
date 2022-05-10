import img from './skeleton-loading.gif';

import './Skeleton.css';

const Skeleton = ({classes, wrapp}) => {
    return (
        <section className="skeleton-wrapper"  style={wrapp ? wrapp : null} >
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
            <img src={img} alt="downloadimage" className="skeleton" style={classes ? classes : null} />
        </section>
    )
}

export default Skeleton;