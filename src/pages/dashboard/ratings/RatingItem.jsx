import { LIST_NUMBER_SCORE, formatDate } from "../../../helpers/helpers";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import "./RatingItem.css"

const RatingItem = ({ qual , index }) => {
    return (
        <div key={index} className="grid_item_rating slider-container  slider_container_item_rating">
            <figure className="container_icon_rating">
                {
                    LIST_NUMBER_SCORE.map((value, index) => {
                        return qual.score < value ? <AiOutlineStar key={index} className="icon_rating" score={qual.score} /> : <AiFillStar key={index} className="icon_rating" />
                    })
                }
            </figure>
            <h4 className="text_nowrap title_rating">{qual?.title}</h4>
            <p className="text_nowrap description_rating">{qual?.description} </p>

            <section className="content_info_rating">
                <p className="text_nowrap name_client_rating">{qual?.user?.name}</p>
                <p className="date_rating">{formatDate(qual?.createdAt)}</p>
                <img className="slider_imagen_rating" src={qual?.product?.imagen} alt="" />
                <p className="text_nowrap name_product_rating">{qual?.product?.name}</p>
            </section>

        </div>
    )
}

export default RatingItem;