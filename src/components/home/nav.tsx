import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";

export function NavIcons() {
    return (
        <>
            <nav className="icon-nav">
                <Link to={"/search/electrician"}>
                    <ElectricBoltIcon fontSize="large" />
                </Link>
                <Link to={"/search/mechanic"}>
                    <HomeRepairServiceIcon fontSize="large" />
                </Link>
                <Link to={"/search/pompler"}>
                    <WaterDamageIcon fontSize="large" />
                </Link>
                <Link to={"/search/arquitect"}>
                    <SquareFootIcon fontSize="large" />
                </Link>
                <Link to={"/search/painter"}>
                    <FormatPaintIcon fontSize="large" />
                </Link>
                <Link to={"/search/shipper"}>
                    <LocalShippingIcon fontSize="large" />
                </Link>
            </nav>
        </>
    );
}
