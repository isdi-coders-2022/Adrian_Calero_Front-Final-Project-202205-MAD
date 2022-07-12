import { useParams } from "react-router-dom";

export default function Search() {
    const { profesion } = useParams();
    console.log(profesion);

    return <></>;
}
