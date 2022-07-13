import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export function NavIcons() {
    return (
        <>
            <Divider />
            <nav className="icon-nav">
                <Link to={"/search/electrician"}>
                    <ElectricBoltIcon />
                    Electrician
                </Link>
                <Link to={"/search/mechanic"}>
                    <HomeRepairServiceIcon />
                    Mechanic
                </Link>
                <Link to={"/search/pompler"}>
                    <WaterDamageIcon />
                    Pompler
                </Link>
                <Link to={"/search/arquitect"}>
                    <SquareFootIcon />
                    Arquitect
                </Link>
                <Link to={"/search/painter"}>
                    <FormatPaintIcon />
                    Painter
                </Link>
                <Link to={"/search/shipper"}>
                    <LocalShippingIcon />
                    Shipper
                </Link>
            </nav>
        </>
    );
}
