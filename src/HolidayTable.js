import React from 'react';
import { Dialog, DialogContent, Grid, Typography, DialogTitle, Button } from '@material-ui/core';


function HolidayTable(props) {
    const options = { day: 'numeric' ,month: 'long', year: 'numeric'  };
    const { holidays } = props;
    function handleClose(e) {
        e.stopPropagation();
        props.close();
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle style={{textAlign: "center"}}>
                <Typography variant="h4" style={{color: "black"}}>

{(new Date(holidays.date.iso)).toLocaleDateString("latn", options)}
                    <Typography variant="subheading">
        <h3>{holidays.name}</h3>
                    </Typography>
                </Typography>
            </DialogTitle>
            <DialogContent style={{margin: "0 auto", padding: "4rem"}} contentStyle={{width: "100%", maxWidth: "none"}}>
                <Grid container justify="center" spacing="40">
                    <Grid item lg={6} md={6} xs={12}>
                        <Typography variant="h5">
                          <Button size="large" style={{ background: "purple", color: "white" }}>{holidays.type}</Button>
                        </Typography>
                        <p>{holidays.description}</p>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={handleClose}>Close</Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}


export default HolidayTable;
