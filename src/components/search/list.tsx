import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iProfesional } from "../../interfaces/interfaces";
import { HttpProfesional } from "../../services/http.profesional";
import { iStore } from "../../store/store";
import * as ac from "../../redux/profesional-reducer/action.creator";

export function ListProfesional({
    type,
    search,
}: {
    type: string | undefined;
    search: string | undefined;
}) {
    const profesionals = useSelector(
        (state: iStore) => state.profesional as unknown as iProfesional[]
    );
    const api = new HttpProfesional();
    const dispatch = useDispatch();

    useEffect(() => {
        api.getAllProfesional().then((resp) =>
            dispatch(ac.loadProfesionalAction(resp))
        );
    }, [dispatch]);

    return (
        <ul>
            {profesionals
                .filter(
                    (profesional) =>
                        profesional.profesion === type &&
                        profesional.name
                            .toLowerCase()
                            .includes(search as string)
                )
                .map((profesional) => (
                    <li key={profesional.name} className="card-profesional">
                        <img src={profesional.avatar} alt={profesional.name} />
                        <p>{profesional.name}</p>
                        <p>{profesional.info.price} $/h</p>
                    </li>
                ))}
        </ul>
    );
}
