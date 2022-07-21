import { useDispatch, useSelector } from "react-redux";
import { iList, iProfesional, iReview } from "../../interfaces/interfaces";
import { iStore } from "../../store/store";
import { Link } from "react-router-dom";
import { HttpReview } from "../../services/http.review";
import { useCallback, useEffect, useMemo } from "react";
import { Rating } from "@mui/material";
import { LocalStorage } from "../../services/localStorage";
import LockIcon from "@mui/icons-material/Lock";
import * as ac from "../../redux/list-reducer/action.creator";

export function ListProfesional({
    type,
    search,
    order,
}: {
    type: string | undefined;
    search: string | undefined;
    order: string | undefined;
}) {
    const initialState = <></>;
    const dispatch = useDispatch();
    const api = useMemo(() => new HttpReview(), []);
    const profesionals = useSelector(
        (state: iStore) => state.profesional as iProfesional[]
    );
    const list = useSelector((state: iStore) => state.list as iList[]);
    const reviews = useSelector((state: iStore) => state.review as iReview[]);

    const local = new LocalStorage().getItem();

    const listCreator = useCallback(() => {
        if (local) {
            const objects = profesionals.map(async (prof) => {
                return await api
                    .getAllInProfesionals(prof._id as string)
                    .then((resp) => {
                        const accum = resp.reduce((accumulator, object) => {
                            return accumulator + object.reviews.score;
                        }, 0);

                        const total = resp.length;
                        return { accum, total, prof };
                    });
            });

            return objects;
        }
    }, [local, profesionals, api]);

    useEffect(() => {
        Promise.all(listCreator() as unknown as Array<Promise<iList>>).then(
            (array) => {
                dispatch(ac.setListAction(array));
            }
        );
    }, [dispatch, reviews, api]);

    useEffect(() => {
        if (list.length !== 0) {
            let orderList = [...list];
            switch (order) {
                case "price+":
                    orderList.sort(function (a, b) {
                        return b.prof.info.price - a.prof.info.price;
                    });

                    break;
                case "price-":
                    orderList.sort(function (a, b) {
                        return a.prof.info.price - b.prof.info.price;
                    });

                    break;

                case "votes+":
                    orderList.sort(function (a, b) {
                        return b.total - a.total;
                    });

                    break;
                case "votes-":
                    orderList.sort(function (a, b) {
                        return a.total - b.total;
                    });

                    break;
                case "rating+":
                    orderList.sort(function (a, b) {
                        return b.accum / b.total - a.accum / a.total;
                    });

                    break;
                case "rating-":
                    orderList.sort(function (a, b) {
                        return a.accum / a.total - b.accum / b.total;
                    });

                    break;
            }

            dispatch(ac.setListAction(orderList));
        }
    }, [order]);

    if (!local) {
        return (
            <div className="lock">
                <LockIcon sx={{ fontSize: 120, color: "#023E8A" }} />
            </div>
        );
    }
    if (list.length === 0) {
        return initialState;
    }
    return (
        <ul>
            {list
                .filter(
                    (obj) =>
                        obj.prof.profesion === type &&
                        obj.prof.name.toLowerCase().includes(search as string)
                )
                .map((profesional) => (
                    <li
                        className="card-profesional"
                        key={profesional.prof.name}
                    >
                        <img
                            src={profesional.prof.avatar}
                            alt={profesional.prof.name}
                        />
                        <div>
                            <p>{profesional.prof.name}</p>
                            <Rating
                                name="media-score"
                                value={profesional.accum / profesional.total}
                            />
                            <p>{profesional.prof.info.price} $/h</p>
                        </div>
                        <p>{profesional.total} Votes</p>
                        <Link to={`/detail/${profesional.prof._id}`}>i</Link>
                    </li>
                ))}
        </ul>
    );
}
