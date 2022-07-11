import "./home.css";
import { HeaderHome } from "../components/home/header";
import { NavIcons } from "../components/home/nav";
import { BodyHome } from "../components/home/body";
import { Divider } from "@mui/material";
import { FooterHome } from "../components/home/footer";

export function Home() {
    return (
        <>
            <HeaderHome />
            <NavIcons />
            <Divider />
            <BodyHome />
            <FooterHome />
        </>
    );
}
