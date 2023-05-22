import { Box, Button, Grid, Typography } from "@mui/material";
import PersonalBestCard from "../common/personal-best-card";
import logAction from "../common/log-action";

const PersonalBestGrid4 = (props: {
  bestGuesses: any[];
  isLastPage: boolean;
  setPage: any;
  page: number;
}) => {
  return (
    <>
      <Typography color="textPrimary" variant="h5" mt="64px" mb="32px">
        My best guesses
      </Typography>

      <Grid container spacing={2}>
        {props.bestGuesses.map((guess) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={guess.id}>
              <PersonalBestCard
                distance={guess.errorDistance}
                id={guess.location.id}
                maxHeight="175px"
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
              mb: "43px",
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

export default PersonalBestGrid4;
