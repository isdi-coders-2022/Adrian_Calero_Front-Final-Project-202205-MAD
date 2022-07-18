import { useSelector } from "react-redux";
import { iList, iProfesional } from "../../interfaces/interfaces";
import { iStore } from "../../store/store";
import { Link } from "react-router-dom";
import { HttpReview } from "../../services/http.review";
import { useEffect, useMemo, useState } from "react";
import { Rating } from "@mui/material";

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

    const arrayProfFiltered = useMemo(() => {
        return profesionals.filter(
            (profesional) =>
                profesional.profesion === type &&
                profesional.name.toLowerCase().includes(search as string)
        );
    }, [type, search, profesionals, order]);

    let arrayProf:
        | Promise<{
              accum: number;
              total: number;
              prof: iProfesional;
          }>[]
        | null = null;

    if (arrayProfFiltered.length !== 0) {
        arrayProf = arrayProfFiltered.map(async (prof) => {
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
    }
    let listProf: Promise<[] | iList[]>;
    switch (order) {
        case "price+":
            listProf = Promise.all(arrayProf as unknown as iList[]).then(
                (array) =>
                    array.sort(function (a, b) {
                        return b.prof.info.price - a.prof.info.price;
                    })
            );

            break;

        default:
            listProf = Promise.all(arrayProf as unknown as iList[]);
            break;
    }
    // Promise.all(arrayProf as []).then((array) => array);

    useEffect(() => {
        if (arrayProf) {
            listProf.then((array) => {
                setRender(
                    <ul>
                        {array.map((profesional) => (
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
                                    <p>{profesional.prof.info.price} $/h</p>
                                </div>
                                <p>{profesional.total} Votes</p>
                                <Link to={`/detail/${profesional.prof._id}`}>
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
    }, [arrayProfFiltered]);

    return render;
}
