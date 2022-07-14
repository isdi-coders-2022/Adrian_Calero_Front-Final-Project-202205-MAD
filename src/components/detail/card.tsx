import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { iStore } from "../../store/store";
import { iProfesional } from "../../interfaces/interfaces";

export function CardDetail() {
    const { id } = useParams();

    const profesionals = useSelector(
        (state: iStore) => state.profesional as unknown as iProfesional[]
    );

    return (
        <>
            {profesionals
                .filter((prof) => prof._id === id)
                .map((prof) => (
                    <div className="card-detail" key={prof.name}>
                        <img src={prof.avatar} alt={prof.name} />
                        <h3>
                            {prof.name} - {prof.profesion}
                        </h3>
                        <h4>{prof.info.price}</h4>
                        <div className="parraf">
                            <p>{prof.info.description}</p>
                        </div>

                        <video src={prof.info.video} controls />
                    </div>
                ))}
        </>
    );
}
