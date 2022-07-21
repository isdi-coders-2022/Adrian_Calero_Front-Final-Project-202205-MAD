import { Search } from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { ListProfesional } from "./list";

export function SearchAndFilter() {
    const { profesion } = useParams();
    const [type, setType] = useState(profesion);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setType(element.value);
    }

    function handlerSearch(ev: SyntheticEvent) {
        const eventTarget = ev.target as HTMLFormElement;
        setSearch(eventTarget.value);
    }

    function handleOrder(ev: SyntheticEvent) {
        const eventTarget = ev.target as HTMLFormElement;
        setOrder(eventTarget.value);
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
                    data-testid="order"
                    value={order}
                    onChange={handleOrder}
                    className="select"
                >
                    <option value="">Order by:</option>
                    <option value="price+">$/h +</option>
                    <option value="price-">$/h -</option>
                    <option value="votes+">Votes +</option>
                    <option value="votes-">Votes -</option>
                    <option value="rating+">Media Rating +</option>
                    <option value="rating-">Media Rating -</option>
                </select>
                <select
                    data-testid="profesion"
                    value={type}
                    onChange={handleChange}
                    className="select"
                >
                    <option value="electrician">Electrician</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="plumber">Plumber</option>
                    <option value="arquitect">Arquitect</option>
                    <option value="painter">Painter</option>
                    <option value="shipper">Shipper</option>
                </select>
            </div>

            <div></div>

            <ListProfesional type={type} search={search} order={order} />
        </>
    );
}
