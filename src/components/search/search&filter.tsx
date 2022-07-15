import { Search } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { ListProfesional } from "./list";

export function SearchAndFilter() {
    const { profesion } = useParams();
    const [type, setType] = useState(profesion);
    const [search, setSearch] = useState("");

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setType(element.value);
    }

    function handlerSearch(ev: SyntheticEvent) {
        const eventTarget = ev.target as HTMLFormElement;
        setSearch(eventTarget.value);
    }

    return (
        <>
            <div className="container-search">
                <div className="searcher">
                    <Search />

                    <input
                        type="text"
                        value={search}
                        data-testid="search"
                        onChange={handlerSearch}
                    />
                </div>
                <select
                    data-testid="profesion"
                    value={type}
                    onChange={handleChange}
                    className="select"
                >
                    <option value="electrician">Electrician</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="pompler">Pompler</option>
                    <option value="arquitect">Arquitect</option>
                    <option value="painter">Painter</option>
                    <option value="shipper">Shipper</option>
                </select>
            </div>

            <div></div>

            <ListProfesional type={type} search={search} />
        </>
    );
}
