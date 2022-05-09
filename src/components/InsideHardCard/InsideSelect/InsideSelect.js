import { useState, useRef } from 'react';
import './InsideSelect.css';

const InsideSelect = () => {
    const [size, setSize] = useState("25");
    const [dough, setDough] = useState("traditional");
    const ref25 = useRef();
    const ref30 = useRef();
    const ref35 = useRef();
    const refThin = useRef();
    const refTraditional = useRef();

    const handleSizeChange = (e) => {
        const arrSize = [ref25.current, ref30.current, ref35.current];

        arrSize.forEach(item => item.classList.remove("size-item__active"));
        e.target.classList.add("size-item__active");
        setSize(e.target.name);
    };

    const handleDoughChange = (e) => {
        const arrDough = [refThin.current, refTraditional.current];

        arrDough.forEach(item => item.classList.remove("dough-item__active"));
        e.target.classList.add("dough-item__active");
        setDough(e.target.name);

        if (size === "25" && e.target.name === "thin") {
            ref25.current.classList.remove("size-item__active");
            ref30.current.classList.add("size-item__active");
            setSize("30");
        }
    };


    return (
        <div className="inside-select">
            <div className="inside-select__size">
                <button 
                    ref={ref25}
                    disabled={dough === "thin" ? true : false}
                    onClick={handleSizeChange} 
                    name="25" 
                    className="inside-select__size-item size-item__active">Маленькая</button>
                <button 
                    ref={ref30}
                    onClick={handleSizeChange} 
                    name="30" 
                    className="inside-select__size-item">Средняя</button>
                <button 
                    ref={ref35}
                    onClick={handleSizeChange} 
                    name="35" 
                    className="inside-select__size-item">Большая</button>
            </div>
            <div className="inside-select__dough">
                <button 
                    ref={refTraditional}
                    onClick={handleDoughChange} 
                    name="traditional" 
                    className="inside-select__dough-item dough-item__active">Традиционное</button>
                <button 
                    ref={refThin}
                    onClick={handleDoughChange} 
                    name="thin" 
                    className="inside-select__dough-item">Тонкое</button>
            </div>
        </div>
    );
}

export default InsideSelect;