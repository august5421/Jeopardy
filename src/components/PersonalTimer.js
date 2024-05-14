import React, { useEffect } from "react";
import { colors } from "../utils/colors";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setSessionToken,
  setGameCategories,
  setShowAnswer,
  setActiveQuestion,
  setClickedAnswers,
  setIneligiblePlayers,
  setCanBuzz,
  setActiveAnswerer,
} from "../actions/actions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import timeUpSound from "../Assets/MP3/time-up-buzzer.mp3";
import { useTimer } from "use-timer";

const PersonalTimer = (props) => {
    const dispatch = useDispatch();
    const audio = new Audio(timeUpSound);
    const ineligiblePlayers = useSelector((state) => state.ineligiblePlayers);
    const pausePersonalTimer = useSelector((state) => state.pausePersonalTimer)
    const opponents = useSelector((state) => state.opponents);
    const { time, start, pause, reset, status } = useTimer({
        endTime: 0,
        initialTime: 10,
        timerType: "DECREMENTAL",
        autostart: true,
        onTimeOver: () => {
            audio.play();
            dispatch(setCanBuzz(true))
            
            setTimeout(() => {
                dispatch(setActiveAnswerer(null))
            }, 1000)
            if (ineligiblePlayers.length == opponents.length) {
                dispatch(setShowAnswer(true));
                dispatch(setCanBuzz(false))
                setTimeout(()=>{
                    dispatch(setShowAnswer(false))
                    dispatch(setIneligiblePlayers([]))
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
                }, 2000)
            } else {
                props.restartMainTimer()
            }
        },
    });
    useEffect(() => {
        if (pausePersonalTimer) {
            pause()
        }
    }, [pausePersonalTimer])
  return (
    <div
        style={{
            position: "absolute",
            bottom: 15,
            left: 15,
            width: "60px",
            height: "60px",
        }}
    >
    </div>
  );
};

export default PersonalTimer;
