
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export function BodyHome(){
    return(<>
    <Card variant="outlined">
       <CardContent>
        <Typography variant="h5">Fix your problems with solucions</Typography>
        <Typography paragraph>Your Solution is an app that connects clients with problems and competent professionals from all sectors in demand.
The solutions we offer go beyond putting you in contact with professionals, this app selects the professionals with the best ratings, the ratings are provided by you.
With Your Solution you can choose the right professional to solve your problem.</Typography>
       </CardContent>
       <CardMedia component="img"
          height="400"
          image="./img/fix.jpeg"
          alt="solved plumber"/>
    </Card>
    </>)
}