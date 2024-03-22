import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

export const Rating = ({ starsNumber, reviews }: { starsNumber: number, reviews: string }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (starsNumber >= i) {
            stars.push(<FaStar key={i}></FaStar>);
        } else if (starsNumber == i - 0.5) {
            stars.push(<FaStarHalfAlt key={i}></FaStarHalfAlt>);
        }
        else{
            stars.push(<FaRegStar key={i}></FaRegStar>);
        }
    }

    return (
        <div className="rating">
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
            <span className="rating-text">{reviews} reviews</span>
        </div>
    );
}