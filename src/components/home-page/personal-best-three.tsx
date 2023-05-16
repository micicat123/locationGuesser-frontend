import { Box, Button, Grid, Typography } from "@mui/material";
import PersonalBestCard from "../common/personal-best-card";
import logAction from "../common/log-action";

const PersonalBestGrid3 = (props: {
  bestGuesses: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
}) => {
  return (
    <>
      <Typography color="primary" variant="h4" mb="21px">
        Personal best guesses
      </Typography>
      <Typography color="textPrimary" variant="body1" mb="32px">
        Your personal best guesses appear here. Go on and try to beat your
        personal records or set a new one!
      </Typography>

      <Grid container spacing={2}>
        {props.bestGuesses.map((guess) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={guess.id}>
              <PersonalBestCard
                distance={guess.errorDistance}
                id={guess.location.id}
                maxWidth="420px"
                maxHeight="236.56px"
              />
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.isLastPage ? (
          <div style={{ marginBottom: "50px" }}></div>
        ) : (
          <Button
            variant="outlined"
            sx={{
              height: 43,
              width: 132,
              fontWeight: 400,
              fontSize: "16px",
              mt: "32px",
              mb: "9px",
            }}
            onClick={() => {
              props.setPage(props.page + 1);
              logAction(
                "click",
                "button",
                "load more",
                window.location.pathname
              );
            }}
          >
            LOAD MORE
          </Button>
        )}
      </Box>
    </>
  );
};

export default PersonalBestGrid3;
