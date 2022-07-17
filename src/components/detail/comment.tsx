import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { iProfesional, iReview } from "../../interfaces/interfaces";
import { HttpReview } from "../../services/http.review";
import { iStore } from "../../store/store";
import * as ac from "../../redux/review-reducer/action.creator";
import { Rating } from "@mui/material";
import { LocalStorage } from "../../services/localStorage";
import { Review } from "../../models/review.model";

export function Comment() {
    const reviews = useSelector(
        (state: iStore) => state.review as unknown as iReview[]
    );
    const local = new LocalStorage().getItem();
    const api = new HttpReview();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const date = new Date();

    const [formData, setFormData] = useState({
        img: [""],
        video: [""],
        comment: "",
        score: 0,
    });

    useEffect(() => {
        api.getAllInProfesionals(id as string).then((resp) =>
            dispatch(ac.loadReviewAction(resp))
        );
    }, [dispatch]);

    const sum = reviews.reduce((accumulator, object) => {
        return accumulator + object.reviews.score;
    }, 0);

    function handleDialog() {
        setOpen(true);
    }

    function handleComment(ev: SyntheticEvent) {
        ev.preventDefault();
        setOpen(false);

        const newReview: Review = {
            ...new Review(
                id as Partial<iProfesional>,
                local.id,
                `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                {
                    ...formData,
                    img: formData.img,
                    video: formData.video,
                    comment: formData.comment,
                    score: Number(formData.score),
                }
            ),
        };

        api.addReview(newReview).then((review) =>
            dispatch(ac.createReviewAction(review))
        );
    }

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    }

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
                        <Rating name="rating" value={review.reviews.score} />
                        <p>{review.date}</p>
                        <p>{review.reviews.comment}</p>
                    </li>
                ))}
                <button onClick={handleDialog} className="comment-button">
                    Comment
                </button>
            </ul>
            <dialog open={open}>
                <form method="dialog" onSubmit={handleComment}>
                    <Rating
                        name="score"
                        value={Number(formData.score)}
                        onChange={handleChange}
                    />
                    <label>Comment</label>
                    <textarea
                        name="comment"
                        cols={30}
                        rows={10}
                        value={formData.comment}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit" className="send-button">
                        Send
                    </button>
                </form>
            </dialog>
        </div>
    );
}
