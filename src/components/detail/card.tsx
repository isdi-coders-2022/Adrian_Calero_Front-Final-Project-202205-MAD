import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { iStore } from "../../store/store";
import { iProfesional } from "../../interfaces/interfaces";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export function CardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const profesionals = useSelector(
        (state: iStore) => state.profesional as unknown as iProfesional[]
    );

    function handleBack(profesion: string) {
        navigate(`/search/${profesion}`);
    }

    return (
        <>
            {profesionals
                .filter((prof) => prof._id === id)
                .map((prof) => (
                    <div className="card-detail" key={prof.name}>
                        <div className="card-detail__func">
                            <button onClick={() => handleBack(prof.profesion)}>
                                <ArrowBackIosIcon fontSize="large" />
                            </button>
                            <img src={prof.avatar} alt={prof.name} />
                        </div>
                        <h3>
                            {prof.name} - {prof.profesion}
                        </h3>
                        <h4>{prof.info.price} $/hour</h4>
                        <p>{prof.info.description}</p>
                        <video src={prof.info.video} controls />
                    </div>
                ))}
        </>
    );
}
