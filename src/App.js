import { useState, useEffect } from 'react'
import './App.css';
import LogoFont from './components/LogoFont';
import SignUpScreen from './screens/SignUpScreen';
import GameScreen from './screens/GameScreen';
import Button from "@mui/material/Button";
import { colors } from './utils/colors';
import { useMediaQuery } from 'react-responsive'
import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';
import buzzKeyImgOne from './Assets/Images/buzzOne.PNG';
import {
    setScreenState,
    setOpponents,
    setPlayerTurn,
    setAnimateIn,
    setGameCategories,
    setClickedAnswers,
    setIneligiblePlayers,
    setIneligibleQuestions,
    setActiveAnswerer,
    setPausePersonalTimer,
    setIsDoubleJeopardy,
    setActiveQuestion,
    setShowAnswer,
    setCanBuzz,
} from "./actions/actions";

function App() {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 992});
  const screenState = useSelector(state => state.screenState);
  const animateIn = useSelector(state => state.animateIn);
  const playerTurn = useSelector(state => state.playerTurn);
  const activeAnswerer = useSelector(state => state.activeAnswerer);
  const isDoubleJeopardy = useSelector(state => state.isDoubleJeopardy);
  const endGame = (x) => {
    if (x) {
      const confirmed = window.confirm("Are you sure you want to end the game?");
      if (confirmed) {
        dispatch(setScreenState('SignUp'));
        dispatch(setOpponents([
          {
            name: "", 
            score: 0, 
            buzzKey: "TAB", 
            buzzKeyImg: buzzKeyImgOne,
            error: false,
            helperText: "", 
          }
        ]));
        dispatch(setPlayerTurn(null));
        dispatch(setAnimateIn('SignUp'));
        dispatch(setGameCategories([]));
        dispatch(setClickedAnswers([]));
        dispatch(setIneligiblePlayers([]));
        dispatch(setIneligibleQuestions([]));
        dispatch(setActiveAnswerer(null));
        dispatch(setPausePersonalTimer(false));
        dispatch(setIsDoubleJeopardy(false));
        dispatch(setActiveQuestion({
          type: "",
          difficulty: "",
          category: "",
          question: "",
          correctAnswer: "",
          incorrectAnswers: [],
          answerBank: [],
          price: null,
          animation: null,
        }));
        dispatch(setShowAnswer(false));
        dispatch(setCanBuzz(false));
      }  
    } else {
      dispatch(setScreenState('SignUp'));
        dispatch(setOpponents([
          {
            name: "", 
            score: 0, 
            buzzKey: "TAB", 
            buzzKeyImg: buzzKeyImgOne,
            error: false,
            helperText: "", 
          }
        ]));
        dispatch(setPlayerTurn(null));
        dispatch(setAnimateIn('SignUp'));
        dispatch(setGameCategories([]));
        dispatch(setClickedAnswers([]));
        dispatch(setIneligiblePlayers([]));
        dispatch(setIneligibleQuestions([]));
        dispatch(setActiveAnswerer(null));
        dispatch(setPausePersonalTimer(false));
        dispatch(setIsDoubleJeopardy(false));
        dispatch(setActiveQuestion({
          type: "",
          difficulty: "",
          category: "",
          question: "",
          correctAnswer: "",
          incorrectAnswers: [],
          answerBank: [],
          price: null,
          animation: null,
        }));
        dispatch(setShowAnswer(false));
        dispatch(setCanBuzz(false));
    }
    
  }
  
  
  return (
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left:0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.blue,
        zIndex: 1,
      }}>
        {screenState === 'SignUp' ? (
          <>
            <div className={`animate__animated ${animateIn === 'SignUp' ? 'animate__zoomIn' : 'animate__zoomOut'}`}>
              <LogoFont
                text="Jeopardy"
                color={colors.white}
                fontWeight="bold"
                fontSize="40px"
                margins="0px 0px 16px 0px"
              />
            </div>
            <div className={`animate__animated ${animateIn === 'SignUp' ? 'animate__zoomIn' : 'animate__zoomOut'} animate__delay-05s`}>
              <SignUpScreen /> 
            </div>
          </>
        ) : (
          <>
            <div>
              <div className={`animate__animated ${animateIn === 'GameScreen' ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '70px',
                  display: 'flex',
                  alignItems:'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', flexDirection:'row', width: '100%', color: colors.white}}>
                    <LogoFont
                      text={isDoubleJeopardy ? "Double Jeopardy" : "Jeopardy"}
                      color={colors.white}
                      fontWeight="bold"
                      fontSize="25px"
                      margins="0px 0px 0px 10px"
                    />
                    <>
                      {activeAnswerer ? (<>{activeAnswerer} Buzzed In!</>) : ((playerTurn == 'Thanks For Playing!' ? {playerTurn} : <>It's {playerTurn}'s Turn!</>))}
                    </>
                    <Button
                        color="error"
                        variant="contained"
                        style={{margin: "0px 10px 0px"}}
                        onClick={()=> {endGame()}}
                    >
                    END GAME
                    </Button>
                  </div>
                </div>
              </div>
              <div className={`animate__animated ${animateIn === 'GameScreen' ? 'animate__slideInUp' : 'animate__slideOutDown'}`}>
                <GameScreen isDesktop={isDesktop} endGame={() => {endGame()}} /> 
              </div>
            </div>
          </>
        )}

      </div>
  );
}

export default App;
