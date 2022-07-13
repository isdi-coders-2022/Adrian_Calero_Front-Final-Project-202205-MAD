import { FooterHome } from "../components/home/footer";
import { HeaderHome } from "../components/home/header";
import { SearchAndFilter } from "../components/search/search&filter";
import "./search.css";

export default function Search() {
    return (
        <>
            <HeaderHome />
            <SearchAndFilter />
            <FooterHome />
        </>
    );
}
