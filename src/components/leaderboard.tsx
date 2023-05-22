import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Leaderboard = (props: {
  location_id: number;
  errorDistance: any;
  userId: number;
}) => {
  const [guesses, setGuesses] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response: any = await axios.get(`/guess/${props.location_id}`, {
          headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        });
        setGuesses(response.data);
      } catch (err) {
        console.log("Couldn't get authenticated user!");
      }
    })();
  }, [props.errorDistance]);

  useEffect(() => {
    const fetchData = async () => {
      if (guesses.length > 0) {
        for (const guess of guesses) {
          const response = await axios.get(`upload/user/${guess.user.id}`, {
            responseType: "blob",
          });
          setImageUrls([...imageUrls, URL.createObjectURL(response.data)]);
        }
      }
    };
    fetchData();
  }, [guesses]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="textPrimary" variant="h4" sx={{ mr: 11, mb: 2 }}>
        Leaderboard
      </Typography>
      <Box>
        {guesses.map((guess: any, index: number) => {
          const displayIndex = index + 1;
          let formattedDate = "";

          const date = new Date(guess.createdAt);
          const currentDate = new Date();
          const timeDifference = currentDate.getTime() - date.getTime();
          const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));
          const minutesPassed = Math.floor(timeDifference / (1000 * 60));
          if (hoursPassed < 25) {
            formattedDate = `${hoursPassed} hours ago`;
          } else if (hoursPassed < 1) {
            formattedDate = `${minutesPassed} minutes ago`;
          } else {
            formattedDate = `${date.getDate()}. ${
              date.getMonth() + 1
            }. ${date.getFullYear()}`;
          }

          return (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                p: 0.5,
                borderRadius: "4px",
                backgroundColor:
                  guess.user.id === props.userId ? "#619B8A" : null,
              }}
              key={displayIndex}
            >
              <Avatar
                sx={{
                  width: 27,
                  height: 27,
                  backgroundImage:
                    displayIndex === 1
                      ? "linear-gradient(41.75deg, #FE7F2D 22.78%, #FCCA46 87.18%)"
                      : displayIndex === 2
                      ? "linear-gradient(41.75deg, #D8D8D8 22.78%, #999999 87.18%)"
                      : displayIndex === 3
                      ? "linear-gradient(41.75deg, #956956 22.78%, #D79376 87.18%)"
                      : null,
                  backgroundColor:
                    displayIndex !== 1 &&
                    displayIndex !== 2 &&
                    displayIndex !== 3
                      ? "#233D4D"
                      : null,
                }}
              >
                <Typography color="white" variant="body2">
                  {displayIndex}
                </Typography>
              </Avatar>
              <Avatar src={imageUrls[index]} />
              <Box>
                <Typography
                  color={
                    guess.user.id === props.userId ? "white" : "textPrimary"
                  }
                  variant="body1"
                >
                  {guess.user.id === props.userId
                    ? "You"
                    : `${guess.user.firstName} ${guess.user.lastName}`}
                </Typography>
                <Typography
                  color={
                    guess.user.id === props.userId ? "white" : "textPrimary"
                  }
                  variant="body2"
                >
                  {formattedDate}
                </Typography>
              </Box>
              <Typography
                color={guess.user.id === props.userId ? "white" : "primary"}
                variant="body1"
                sx={{ marginLeft: "auto" }}
              >
                {guess.errorDistance} m
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Leaderboard;
