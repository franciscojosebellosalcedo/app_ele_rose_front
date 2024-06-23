import { useSelector } from "react-redux";
import RatingItem from "./RatingItem";
import "./GridRatings.css"

const GridRatings = () => {

    const ratings = useSelector((state) => state.rating.data.list);

  return (
    <div className="grid_ratings">
        {
            ratings && ratings.length > 0 ?
                <>
                    {
                        ratings.map((qual, index)=>{
                            return (
                                <RatingItem key={index} qual={qual} index={index}/>
                            )
                        })
                    }
                </>
            : ""
        }
    </div>
  )
}

export default GridRatings;