import { Button, Tabs } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import WaterDamageIcon from "@mui/icons-material/WaterDamage";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export function NavIcons() {
    return (
        <nav>
            <ul>
                <Tabs variant="scrollable" scrollButtons>
                    <li>
                        <Button variant="outlined">
                            <ElectricBoltIcon />
                        </Button>
                    </li>
                    <li>
                        <Button variant="outlined">
                            <HomeRepairServiceIcon />
                        </Button>
                    </li>
                    <li>
                        <Button variant="outlined">
                            <WaterDamageIcon />
                        </Button>
                    </li>
                    <li>
                        <Button variant="outlined">
                            <SquareFootIcon />
                        </Button>
                    </li>
                    <li>
                        <Button variant="outlined">
                            <FormatPaintIcon />
                        </Button>
                    </li>
                    <li>
                        <Button variant="outlined">
                            <LocalShippingIcon />
                        </Button>
                    </li>
                </Tabs>
            </ul>
        </nav>
    );
}
