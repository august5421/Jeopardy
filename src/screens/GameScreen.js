import React from "react";
import { useState, useEffect } from "react";
import LogoFont from "../components/LogoFont";
import PodiumComponent from "../components/PodiumComponent";
import { colors } from "../utils/colors";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionToken,
  setGameCategories,
  setShowAnswer,
  setActiveQuestion,
  setClickedAnswers,
  setCanBuzz,
  setActiveAnswerer,
  setIneligiblePlayers,
  setIneligibleQuestions,
  setPausePersonalTimer,
  setPlayerTurn,
  setIsDoubleJeopardy,
  setDailyDouble
} from "../actions/actions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTimer } from "use-timer";
import timeUpSound from "../Assets/MP3/time-up-buzzer.mp3";
import ddSound from "../Assets/MP3/Daily Double.mp3";
import PersonalTimer from "../components/PersonalTimer";

function GameScreen(props) {
  const dispatch = useDispatch();
  const opponents = useSelector((state) => state.opponents);
  const playerTurn = useSelector((state) => state.playerTurn);
  const gameCategories = useSelector((state) => state.gameCategories);
  const clickedAnswers = useSelector((state) => state.clickedAnswers);
  const sessionToken = useSelector((state) => state.sessionToken);
  const showAnswer = useSelector((state) => state.showAnswer);
  const activeQuestion = useSelector((state) => state.activeQuestion);
  const canBuzz = useSelector((state) => state.canBuzz);
  const activeAnswerer = useSelector((state) => state.activeAnswerer);
  const ineligiblePlayers = useSelector((state) => state.ineligiblePlayers);
  const ineligibleQuestions = useSelector((state) => state.ineligibleQuestions);
  const pausePersonalTimer = useSelector((state) => state.pausePersonalTimer);
  const isDoubleJeopardy = useSelector((state) => state.isDoubleJeopardy);
  const dailyDouble = useSelector((state) => state.dailyDouble);
  const audio = new Audio(timeUpSound);
  const ddAudio = new Audio(ddSound);
  const { time, start, pause, reset, status } = useTimer({
    endTime: 0,
    initialTime: 10,
    timerType: "DECREMENTAL",
    onTimeOver: () => {
      dispatch(setShowAnswer(true));
      dispatch(setCanBuzz(false));

      audio.play();
      setTimeout(() => {
        dispatch(setShowAnswer(false));
        dispatch(setIneligiblePlayers([]));
        dispatch(
          setActiveQuestion({
            type: "",
            difficulty: "",
            category: "",
            question: "",
            correctAnswer: "",
            incorrectAnswers: [],
            answerBank: [],
            price: null,
            animation: null,
          })
        );
        if (ineligibleQuestions.length == 30 && isDoubleJeopardy) {
          setPlayerTurn('Thanks For Playing!')
          setTimeout(() => {
            props.endGame(false)
          }, 1000)
        }
      }, 2000);
    },
  });

  const categories = [
    { title: "GENERAL", key: 9 },
    { title: "BOOKS", key: 10 },
    { title: "FILM", key: 11 },
    { title: "MUSIC", key: 12 },
    { title: "MUSICALS", key: 13 },
    { title: props.isDesktop ? "TELEVISION" : "TV", key: 14 },
    { title: "VIDEO GAMES", key: 15 },
    { title: "BOARD GAMES", key: 16 },
    { title: props.isDesktop ? "SCIENCE & NATURE" : "SCIENCE", key: 17 },
    { title: "COMPUTERS", key: 18 },
    { title: props.isDesktop ? "MATHEMATICS" : "MATH", key: 19 },
    { title: props.isDesktop ? "MYTHOLOGY" : "MYTH", key: 20 },
    { title: "SPORTS", key: 21 },
    { title: "GEOGRAPHY", key: 22 },
    { title: "HISTORY", key: 23 },
    { title: "POLITICS", key: 24 },
    { title: "ART", key: 25 },
    { title: props.isDesktop ? "CELEBRITIES" : "CELEBS", key: 26 },
    { title: "ANIMALS", key: 27 },
    { title: "VEHICLES", key: 28 },
    { title: "COMICS", key: 29 },
    { title: "GADGETS", key: 30 },
    { title: props.isDesktop ? "JAPANESE ANIME" : "ANIME", key: 31 },
    { title: "CARTOONS", key: 32 },
  ];

  const prices = [
    { price: 200, difficulty: "easy" },
    { price: 400, difficulty: "easy" },
    { price: 600, difficulty: "medium" },
    { price: 800, difficulty: "hard" },
    { price: 1000, difficulty: "hard" },
  ];

  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === 0) {
          dispatch(setSessionToken(data.token));
        } else {
          console.error("Failed to retrieve session token");
        }
      })
      .catch((error) => {
        console.error("Error fetching session token:", error);
      });
  }, []);

  useEffect(() => {
    const shuffledCategories = categories.sort(() => 0.5 - Math.random());
    const selectedCategories = shuffledCategories.slice(0, 6);
    dispatch(setGameCategories(selectedCategories));
  }, []);

  useEffect(() => {
    const long = Math.floor(Math.random() * 5) + 1; 
    const lat = Math.floor(Math.random() * 6) + 1; 
  }, []);

  useEffect(() => {
    if (ineligibleQuestions.length == 30 && !isDoubleJeopardy) {
      setTimeout(()=>{
        dispatch(setIsDoubleJeopardy(true))
        dispatch(setIneligibleQuestions([]));
      }, 1000)
    }
    
  }, [ineligibleQuestions]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (canBuzz) {
        if (
          event.key === "Tab" &&
          event.code === "Tab" &&
          !ineligiblePlayers.includes(opponents[0].name)
        ) {
          dispatch(setActiveAnswerer(opponents[0]?.name));
          dispatch(setCanBuzz(false));
          let iPlayers = ineligiblePlayers;
          iPlayers.push(opponents[0].name);
          dispatch(setIneligiblePlayers(iPlayers));
          reset();
        } else if (
          event.key === "Enter" &&
          event.code === "Enter" &&
          !ineligiblePlayers.includes(opponents[1].name)
        ) {
          dispatch(setActiveAnswerer(opponents[1]?.name));
          dispatch(setCanBuzz(false));
          let iPlayers = ineligiblePlayers;
          iPlayers.push(opponents[1].name);
          dispatch(setIneligiblePlayers(iPlayers));
          reset();
        } else if (
          event.key === " " &&
          event.code === "Space" &&
          !ineligiblePlayers.includes(opponents[2].name)
        ) {
          dispatch(setActiveAnswerer(opponents[2]?.name));
          dispatch(setCanBuzz(false));
          let iPlayers = ineligiblePlayers;
          iPlayers.push(opponents[2].name);
          dispatch(setIneligiblePlayers(iPlayers));
          reset();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    canBuzz,
    opponents,
    dispatch,
    reset,
    setActiveAnswerer,
    setIneligiblePlayers,
  ]);

  function decodeHtmlEntities(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  const handleQuestionSelection = (v, w, x, y, z) => {
    if (dailyDouble[0] == v && dailyDouble[1] == w) {
      ddAudio.play()
    } else {
      let animation;
      if (v >= 1 && v <= 3) {
        if (w === 0 || w === 1) {
          animation = "animate__fadeInTopLeft";
        } else if (w === 2) {
          animation = "animate__fadeInLeft";
        } else if (w >= 3 && w <= 4) {
          animation = "animate__fadeInBottomLeft";
        }
      } else if (v >= 3 && v <= 5) {
        if (w === 0 || w === 1) {
          animation = "animate__fadeInTopRight";
        } else if (w === 2) {
          animation = "animate__fadeInRight";
        } else if (w >= 3 && w <= 4) {
          animation = "animate__fadeInBottomRight";
        }
      }
      fetch(
        `https://opentdb.com/api.php?amount=1&category=${x}&difficulty=${y}&type=multiple&token=${sessionToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          const questionData = data.results[0];
          const allAnswers = [
            questionData.correct_answer,
            ...questionData.incorrect_answers,
          ];
          const randomizedAnswers = allAnswers.sort(() => Math.random() - 0.5);
          dispatch(
            setActiveQuestion({
              type: questionData.type,
              difficulty: questionData.difficulty,
              category: questionData.category,
              question: questionData.question,
              correctAnswer: questionData.correct_answer,
              incorrectAnswers: questionData.incorrect_answers,
              answerBank: randomizedAnswers,
              price: z,
              animation: animation,
            })
          );
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
        });
    }
  };

  const handleAnswer = (x, y) => {
    if (y) {
      if (isDoubleJeopardy) {
        handleRightAnswer(x * 2)
      } else {
        handleRightAnswer(x)
      }
    } else {
      if (isDoubleJeopardy) {
        handleWrongAnswer(x * 2)
      } else {
        handleWrongAnswer(x)
      }
    }
  }

  const handleRightAnswer = (x) => {
    let opponentIndex = opponents.findIndex(opponent => opponent.name === activeAnswerer);
    if (opponentIndex !== -1) {
      opponents[opponentIndex].score += x;
      dispatch(setPlayerTurn(opponents[opponentIndex].name))
    }
    dispatch(setPausePersonalTimer(true))
    dispatch(setShowAnswer(true));
    dispatch(setCanBuzz(false))
    dispatch(setActiveAnswerer(null))
    setTimeout(()=>{
        dispatch(setShowAnswer(false))
        dispatch(setIneligiblePlayers([]))
        dispatch(setPausePersonalTimer(false))
        dispatch(
            setActiveQuestion(
                {
                    type: "",
                    difficulty: "",
                    category: "",
                    question: "",
                    correctAnswer: "",
                    incorrectAnswers: [],
                    answerBank: [],
                    price: null,
                    animation: null,
                }
            )
        )
        if (ineligibleQuestions.length == 30 && isDoubleJeopardy) {
          setPlayerTurn('Thanks For Playing!')
          setTimeout(() => {
            props.endGame(false)
          }, 1000)
        }
    }, 2000)
  }

  const handleWrongAnswer = (x) => {
    let opponentIndex = opponents.findIndex(opponent => opponent.name === activeAnswerer);
    if (opponentIndex !== -1) {
      opponents[opponentIndex].score -= x;
    }
    if (ineligiblePlayers.length == opponents.length) {
      dispatch(setPausePersonalTimer(true))
      dispatch(setShowAnswer(true));
      dispatch(setCanBuzz(false))
      dispatch(setActiveAnswerer(null))
      setTimeout(()=>{
          dispatch(setShowAnswer(false))
          dispatch(setIneligiblePlayers([]))
          dispatch(setPausePersonalTimer(false))
          dispatch(
              setActiveQuestion(
                  {
                      type: "",
                      difficulty: "",
                      category: "",
                      question: "",
                      correctAnswer: "",
                      incorrectAnswers: [],
                      answerBank: [],
                      price: null,
                      animation: null,
                  }
              )
          )
          if (ineligibleQuestions.length == 30 && isDoubleJeopardy) {
            setPlayerTurn('Thanks For Playing!')
            setTimeout(() => {
              props.endGame(false)
            }, 1000)
          }
      }, 2000)
    } else {
      dispatch(setPausePersonalTimer(true))
      dispatch(setActiveAnswerer(null))
      dispatch(setCanBuzz(true))
      start()
      setTimeout(()=>{
        dispatch(setPausePersonalTimer(false))
      }, 2000)
    }
  }
  return (
    <div
      style={{
        color: colors.white,
        backgroundColor: colors.black,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        marginTop: "70px",
        width: "100vw",
        height: "calc(100vh - 70px)",
      }}
    >
      {activeQuestion.question !== "" && (
        <div
          style={{
            position: "absolute",
            top: 15,
            left: 0,
            width: "100%",
            height: props.isDesktop
              ? "calc(100vh - 258px)"
              : "calc(100vh - 275px)",
            fontFamily: "boardFont, sans-serif",
            textTransform: "uppercase",
            backgroundColor: colors.blue,
            zIndex: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: 'center'
          }}
          className={`animate__animated ${activeQuestion.animation}`}
        >
          {decodeHtmlEntities(activeQuestion.question)}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: props.isDesktop ? "row" : "column",
            }}
          >
            {activeQuestion.answerBank.map((answer, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.4)",
                  width: "200px",
                  height: props.isDesktop ? "75px" : "50px",
                  margin: props.isDesktop ? "25px" : "10px",
                  textAlign: "center",
                  cursor: activeAnswerer ? 'pointer' : null,
                  color:
                    answer == activeQuestion.correctAnswer && showAnswer
                      ? colors.green
                      : colors.white,
                }}
                onClick={() => activeAnswerer !== null ? handleAnswer(activeQuestion.price, answer === activeQuestion.correctAnswer) : null}
              >
                {decodeHtmlEntities(answer)}
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 15,
              left: 15,
              width: "60px",
              height: "60px",
            }}
          >
            {canBuzz ? (
              <CircularProgressbar
                value={time}
                text={time}
                maxValue={10}
                styles={buildStyles({
                  width: "80px",
                  height: "80px",
                  textColor: colors.white,
                  pathColor: colors.white,
                  trailColor: colors.black,
                })}
              />
            ) : (
              <PersonalTimer restartMainTimer={start} pauseMainTimer={pause} />
            )}
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: 15,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {gameCategories.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            style={{
              width: "calc(100vw / 6)",
              height: "calc(100vh - 275px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding:
                categoryIndex == 0
                  ? `${
                      props.isDesktop ? "0px 15px 0px 15px" : "0px 5px 0px 5px"
                    }`
                  : `${
                      props.isDesktop ? "0px 15px 0px 0px" : "0px 5px 0px 0px"
                    }`,
              fontFamily: "boardFont, sans-serif",
              textAlign: "center",
            }}
          >
            <div
              style={{
                backgroundColor: colors.blue,
                height: "calc((100vh - 275px) / 6)",
                fontSize: props.isDesktop ? "20px" : "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: props.isDesktop ? "15px" : "5px",
                color: colors.white,
                fontWeight: 900,
                whiteSpace: "pre-wrap",
              }}
            >
              {props.isDesktop
                ? category.title
                : category.title.length > 7
                ? `${category.title.slice(0, 6)}-\n${category.title.slice(6)}`
                : category.title}
            </div>
            {prices.map((price, difficultyIndex) => {
              const isQuestionIneligible = ineligibleQuestions.some(
                (item) =>
                  item.lat === categoryIndex && item.lon === difficultyIndex
              );

              return (
                <div
                  key={difficultyIndex}
                  style={{
                    backgroundColor: isQuestionIneligible
                      ? colors.blue
                      : colors.blue,
                    height: "calc((100vh - 275px) / 6)",
                    fontSize: props.isDesktop ? "20px" : "14px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: 'pointer',
                    marginBottom:
                      difficultyIndex == 5
                        ? "0px"
                        : `${props.isDesktop ? "15px" : "5px"}`,
                    color: isQuestionIneligible ? colors.blue : colors.yellow,
                    fontWeight: 900,
                  }}
                  onClick={() => {
                    if (!isQuestionIneligible) {
                      const ieQuest = [
                        ...ineligibleQuestions,
                        { lat: categoryIndex, lon: difficultyIndex },
                      ];
                      dispatch(setIneligibleQuestions(ieQuest));
                      handleQuestionSelection(
                        categoryIndex,
                        difficultyIndex,
                        category.key,
                        price.difficulty,
                        price.price
                      );
                      start();
                      dispatch(setCanBuzz(true));
                      setClickedAnswers([
                        ...clickedAnswers,
                        {
                          category: categoryIndex,
                          difficulty: difficultyIndex,
                        },
                      ]);
                    }
                  }}
                >
                  {!isQuestionIneligible && "$" + (isDoubleJeopardy ? (price.price * 2) : price.price)}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "175px",
          display: "flex",
          flexDirection: props.isDesktop ? "row" : "column",
        }}
      >
        {opponents.map((opponent, index) => (
          <PodiumComponent
            key={index}
            index={index}
            isDesktop={props.isDesktop}
            time={time}
            start={() => {
              start();
            }}
            reset={() => {
              reset();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GameScreen;
