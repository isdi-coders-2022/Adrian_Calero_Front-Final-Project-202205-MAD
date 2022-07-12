import { Tab, Tabs } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

export function NavIcons() {
    const [value, setValue] = useState(0);

    const handleChange = (ev: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Tabs value={value} variant="scrollable" onChange={handleChange}>
            <Link to={"/search/electrician"}>
                <Tab icon={<ElectricBoltIcon />} />
            </Link>
            <Link to={"/search/mechanic"}>
                <Tab icon={<HomeRepairServiceIcon />} />
            </Link>
            <Link to={"/search/pompler"}>
                <Tab icon={<WaterDamageIcon />} />
            </Link>
            <Link to={"/search/arquitect"}>
                <Tab icon={<SquareFootIcon />} />
            </Link>
            <Link to={"search/painter"}>
                <Tab icon={<FormatPaintIcon />} />
            </Link>
            <Link to={"search/shipper"}>
                <Tab icon={<LocalShippingIcon />} />
            </Link>
        </Tabs>
    );
}
