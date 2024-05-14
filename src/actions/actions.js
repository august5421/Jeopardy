export const setScreenState = (state) => ({
    type: 'SET_SCREEN_STATE',
    payload: state
  });
  
  export const setOpponents = (opponents) => ({
    type: 'SET_OPPONENTS',
    payload: opponents
  });
  
  export const setPlayerTurn = (player) => ({
    type: 'SET_PLAYER_TURN',
    payload: player
  });
  
  export const setAnimateIn = (animateIn) => ({
    type: 'ANIMATE_IN',
    payload: animateIn
  });

  export const setGameCategories = (gameCategories) => ({
    type: 'GAME_CATEGORIES',
    payload: gameCategories
  });
  
  export const setSessionToken = (sessionToken) => ({
    type: 'SESSION_TOKEN',
    payload: sessionToken
  });

  export const setClickedAnswers = (clickedAnswers) => ({
    type: 'CLICKED_ANSWERS',
    payload: clickedAnswers
  });
  
  export const setActiveQuestion = (activeQuestion) => ({
    type: 'ACTIVE_QUESTION',
    payload: activeQuestion
  });

  export const setShowAnswer = (showAnswer) => ({
    type: 'SHOW_ANSWER',
    payload: showAnswer
  });

  export const setActiveAnswerer = (activeAnswerer) => ({
    type: 'ACTIVE_ANSWERER',
    payload: activeAnswerer
  });
  
  export const setCanBuzz = (canBuzz) => ({
    type: 'CAN_BUZZ',
    payload: canBuzz
  });

  export const setIneligiblePlayers = (ineligiblePlayers) => ({
    type: 'INELIGIBLE_PLAYERS',
    payload: ineligiblePlayers
  });
  
  export const setIneligibleQuestions = (ineligibleQuestions) => ({
    type: 'INELIGIBLE_QUESTIONS',
    payload: ineligibleQuestions
  });

  export const setPausePersonalTimer = (pausePersonalTimer) => ({
    type: 'PAUSE_PERSONAL_TIMER',
    payload: pausePersonalTimer
  });

  export const setIsDoubleJeopardy = (isDoubleJeopardy) => ({
    type: 'IS_DOUBLE_JEOPARDY',
    payload: isDoubleJeopardy
  })

  export const setDailyDouble = (dailyDouble) => ({
    type: 'DAILY_DOUBLE',
    payload: dailyDouble
  })