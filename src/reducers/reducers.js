
import buzzKeyImgOne from '../Assets/Images/buzzOne.PNG';

const initialState = {
    screenState: 'SignUp',
    opponents: [
        {
            name: "", 
            score: 0, 
            buzzKey: "TAB", 
            buzzKeyImg: buzzKeyImgOne,
            error: false, 
            helperText: "", 
        }
    ],
    playerTurn: null,
    animateIn: 'SignUp', 
    gameCategories: [],
    clickedAnswers: [],
    ineligiblePlayers: [],
    ineligibleQuestions: [],
    activeAnswerer: null,
    pausePersonalTimer: false,
    isDoubleJeopardy: false,
    dailyDouble: [],
    activeQuestion: 
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
      },
      showAnswer: false,
      canBuzz: false,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SCREEN_STATE':
        return {
          ...state,
          screenState: action.payload
        };
      case 'SET_OPPONENTS':
        return {
          ...state,
          opponents: action.payload
        };
      case 'SET_PLAYER_TURN':
        return {
          ...state,
          playerTurn: action.payload
        };
      case 'ANIMATE_IN':
        return {
          ...state,
          animateIn: action.payload
        };
      case 'GAME_CATEGORIES':
        return {
          ...state,
          gameCategories: action.payload
        };
      case   'SESSION_TOKEN':
          return {
            ...state,
            sessionToken: action.payload
          };
      case   'CLICKED_ANSWERS':
          return {
            ...state,
            clickedAnswers: action.payload
          };     
      case   'ACTIVE_QUESTION':
          return {
            ...state,
            activeQuestion: action.payload
          };     
      case   'SHOW_ANSWER':
          return {
            ...state,
            showAnswer: action.payload
          };     
      case   'ACTIVE_ANSWERER':
          return {
            ...state,
            activeAnswerer: action.payload
          };     
      case   'CAN_BUZZ':
          return {
            ...state,
            canBuzz: action.payload
          };     
      case   'INELIGIBLE_PLAYERS':
          return {
            ...state,
            ineligiblePlayers: action.payload
          };     
      case   'INELIGIBLE_QUESTIONS':
          return {
            ...state,
            ineligibleQuestions: action.payload
          };     
      case   'PAUSE_PERSONAL_TIMER':
          return {
            ...state,
            pausePersonalTimer: action.payload
          };     
      case   'IS_DOUBLE_JEOPARDY':
          return {
            ...state,
            isDoubleJeopardy: action.payload
          };     
      case   'DAILY_DOUBLE':
          return {
            ...state,
            dailyDouble: action.payload
          };     
      default:
        return state;
    }
  };
  
  export default rootReducer;