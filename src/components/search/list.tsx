import { useSelector } from "react-redux";
import { iProfesional } from "../../interfaces/interfaces";
import { iStore } from "../../store/store";
import { Link } from "react-router-dom";

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
                    <Link
                        to={`/detail/${profesional._id}`}
                        key={profesional.name}
                    >
                        <li className="card-profesional">
                            <img
                                src={profesional.avatar}
                                alt={profesional.name}
                            />
                            <p>{profesional.name}</p>
                            <p>{profesional.info.price} $/h</p>
                        </li>
                    </Link>
                ))}
        </ul>
    );
}
