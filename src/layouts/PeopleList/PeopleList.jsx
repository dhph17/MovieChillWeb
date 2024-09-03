import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import './styles.scss'

const PeopleList = ({ title, data }) => {
    let navigate = useNavigate();
    const containerRef = useRef(null);
    const [itemsToShow, setItemsToShow] = useState(6);

    useEffect(() => {
        const updateItemsToShow = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;

                // Xác định số lượng items hiển thị dựa trên chiều rộng của container
                if (containerWidth >= window.innerWidth) {
                    setItemsToShow(6); // 100vw, hiển thị 6 items
                } else if (containerWidth >= 0.5 * window.innerWidth) {
                    setItemsToShow(4.7); // 70vw, hiển thị 4.5 items
                } else {
                    setItemsToShow(3);
                }
            }
        };

        updateItemsToShow(); // Tính toán ban đầu
        window.addEventListener('resize', updateItemsToShow); // Cập nhật khi thay đổi kích thước

        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const responsive = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: itemsToShow,
        },
    };



    return (
        <div id="people" ref={containerRef}>
            <div className="people-title">
                {title}
                <FontAwesomeIcon className="people-title_icon" icon={faAngleRight} />
            </div>
            <Carousel className="people_lists"
                responsive={responsive}
                draggable={false}
                autoPlay={true}
                autoPlaySpeed={3000}
            >
                {data?.map((people) => (
                    <div
                        key={people.id}
                        className="people_item"
                        style={{
                            backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${people.profile_path})`,
                        }}
                        onClick={() => navigate(`/people/${people.id}`)}
                    >
                        <div className="overlay-item">
                        </div>
                        <div className="item-name_actor">
                            <div className="item-name">
                                {people.name || people.original_name}
                            </div>

                            <div className="item-actor">
                                {people.character}
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

PeopleList.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default PeopleList