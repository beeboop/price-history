import React from "react";
import classNames from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import MaCard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useLongPress from "../utils/useLongPress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
});

export default function Card({
  className,
  id,
  product,
  location,
  price,
  quantity,
  unit,
  onClick,
  onLongPress,
}) {
  const classes = useStyles();
  const longPressProps = useLongPress(onLongPress, 500);
  const preventDefault = (e) => e.preventDefault();

  return (
    <MaCard
      className={classNames(classes.root, className)}
      variant="outlined"
      {...longPressProps}
      onClick={onClick}
      onContextMenu={preventDefault}
    >
      <CardActionArea>
        <CardContent>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="h5">
                  {product}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {location}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography align="right" gutterBottom variant="subtitle1">
                {`$${price}`}
              </Typography>
              <Typography align="right" variant="body2" color="textSecondary">
                {`${quantity} ${unit} @ $${(price/quantity).toFixed(2)}/${unit}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </MaCard>
  );
}
