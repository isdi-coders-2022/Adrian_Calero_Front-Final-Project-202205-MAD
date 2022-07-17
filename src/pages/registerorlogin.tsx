import { FooterHome } from "../components/home/footer";
import { ButtonsLoginOrRegister } from "../components/loginorregister/body";
import { HeaderRegister } from "../components/register/header";
import "./registerorlogin.css";

export default function RegisterOrLoginPage() {
    return (
        <>
            <HeaderRegister />
            <ButtonsLoginOrRegister />
            <FooterHome />
        </>
    );
}
