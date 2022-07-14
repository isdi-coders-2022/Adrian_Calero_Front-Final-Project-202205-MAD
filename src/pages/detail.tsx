import { CardDetail } from "../components/detail/card";
import { Comment } from "../components/detail/comment";
import { FooterHome } from "../components/home/footer";
import { HeaderHome } from "../components/home/header";
import "./detail.css";

export default function Detail() {
    return (
        <>
            <HeaderHome />
            <CardDetail />
            <Comment />
            <FooterHome />
        </>
    );
}
