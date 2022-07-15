import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { iReview } from "../../interfaces/interfaces";
import { HttpReview } from "../../services/http.review";
import { iStore } from "../../store/store";
import * as ac from "../../redux/review-reducer/action.creator";
import { Rating } from "@mui/material";

export function Comment() {
    const reviews = useSelector(
        (state: iStore) => state.review as unknown as iReview[]
    );
    const api = new HttpReview();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        api.getAllInProfesionals(id as string).then((resp) =>
            dispatch(ac.loadReviewAction(resp))
        );
    }, [dispatch]);
    const sum = reviews.reduce((accumulator, object) => {
        return accumulator + object.reviews.score;
    }, 0);

    return (
        <div className="comments">
            <ul>
                <h3>
                    Media stars:{" "}
                    <Rating name="media-score" value={sum / reviews.length} />
                </h3>
                <h3>Reviews</h3>
                {reviews?.map((review) => (
                    <li key={review._id}>
                        <h4>{review.client.userName}</h4>
                        <Rating name="score" value={review.reviews.score} />
                        <p>{review.date}</p>
                        <p>{review.reviews.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
