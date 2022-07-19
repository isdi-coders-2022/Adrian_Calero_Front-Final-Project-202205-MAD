import { useSelector } from "react-redux";
import { iList, iProfesional } from "../../interfaces/interfaces";
import { iStore } from "../../store/store";
import { Link } from "react-router-dom";
import { HttpReview } from "../../services/http.review";
import { useEffect, useMemo, useState } from "react";
import { Rating } from "@mui/material";
import { LocalStorage } from "../../services/localStorage";
import LockIcon from "@mui/icons-material/Lock";

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
    const api = new HttpReview();
    const [render, setRender] = useState(initialState);
    const profesionals = useSelector(
        (state: iStore) => state.profesional as iProfesional[]
    );
    const local = new LocalStorage().getItem();

    const arrayProfWithRev = useMemo(() => {
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
    }, [profesionals, local]);
    let listProf: Promise<[] | iList[]>;
    if (local) {
        switch (order) {
            case "price+":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return b.prof.info.price - a.prof.info.price;
                    })
                );

                break;
            case "price-":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return a.prof.info.price - b.prof.info.price;
                    })
                );
                break;

            case "votes+":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return b.total - a.total;
                    })
                );
                break;
            case "votes-":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return a.total - b.total;
                    })
                );
                break;
            case "rating+":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return b.accum / b.total - a.accum / a.total;
                    })
                );
                break;
            case "rating-":
                listProf = Promise.all(
                    arrayProfWithRev as unknown as iList[]
                ).then((array) =>
                    array.sort(function (a, b) {
                        return a.accum / a.total - b.accum / b.total;
                    })
                );
                break;
            default:
                listProf = Promise.all(arrayProfWithRev as unknown as iList[]);
                break;
        }
    }

    useEffect(() => {
        if (local !== null) {
            if (listProf) {
                listProf.then((array) => {
                    setRender(
                        <ul>
                            {array
                                .filter(
                                    (obj) =>
                                        obj.prof.profesion === type &&
                                        obj.prof.name
                                            .toLowerCase()
                                            .includes(search as string)
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
                                                value={
                                                    profesional.accum /
                                                    profesional.total
                                                }
                                            />
                                            <p>
                                                {profesional.prof.info.price}{" "}
                                                $/h
                                            </p>
                                        </div>
                                        <p>{profesional.total} Votes</p>
                                        <Link
                                            to={`/detail/${profesional.prof._id}`}
                                        >
                                            i
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    );
                });
            } else {
                setRender(initialState);
            }
        } else {
            setRender(
                <div className="lock">
                    <LockIcon sx={{ fontSize: 120, color: "#023E8A" }} />
                </div>
            );
        }
    }, [arrayProfWithRev, search, type, order, local]);

    return render;
}
