import React, { useState, useEffect } from "react";
import './screens.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import buzzKeyImgTwo from '../Assets/Images/buzzTwo.PNG';
import buzzKeyImgThree from '../Assets/Images/buzzThree.PNG';
import { colors } from '../utils/colors';
import LogoFont from "../components/LogoFont";
import { setOpponents } from '../actions/actions'; 
import { setPlayerTurn } from '../actions/actions'; 
import { setScreenState } from '../actions/actions';
import { setAnimateIn } from '../actions/actions';
import { Provider, useDispatch, useSelector } from 'react-redux';

const SignUpScreen = (props) => {

  const opponents = useSelector(state => state.opponents);
  const dispatch = useDispatch();

  const handleNameChange = (index, newName) => {
    const updatedOpponents = [...opponents];
    updatedOpponents[index] = { ...updatedOpponents[index], name: newName };
    updatedOpponents[index] = {
        ...updatedOpponents[index],
        error: false,
        helperText: ''
    }
    const isDuplicateName = opponents.some((opponent, i) => i !== index && opponent.name === newName);
    if (isDuplicateName) {
        updatedOpponents[index] = {
            ...updatedOpponents[index],
            error: true,
            helperText: 'Duplicate names are not allowed'
        };
    }
    dispatch(setOpponents(updatedOpponents));
  };
  
  const handleAddPlayer = (x, y) => {
    if (opponents.length < 3) {
      if (x === '') {
        const updatedOpponents = [...opponents];
        updatedOpponents[y] = {
            ...updatedOpponents[y],
            error: true,
            helperText: 'Player Must Have a Name'
        }
        dispatch(setOpponents(updatedOpponents));
      } else {
        dispatch(
          setOpponents([
            ...opponents,
            {
              name: '',
              score: 0,
              buzzKey: y == 1 ? 'SPACE' : 'ENTER',
              buzzKeyImg: y == 1 ? buzzKeyImgTwo : buzzKeyImgThree,
              error: false,
              helperText: ''
            }
          ])
        );
      }
    }
  };
  

  const handleRemovePlayer = (index) => {
    const updatedOpponents = [...opponents];
    updatedOpponents.splice(index, 1);
    dispatch(setOpponents(updatedOpponents));
  };

  const handleStartGame = () => {
    const randomOpponentName = opponents[Math.floor(Math.random() * opponents.length)].name;
    dispatch(setPlayerTurn(randomOpponentName))
    dispatch(setAnimateIn('GameScreen'))
    setTimeout(() => {
        dispatch(setScreenState('GameScreen'))
    }, 500);
  }

  const isAnyNameBlankWithError = opponents.some((opponent, index, array) => {
    if (opponent.name === "") {
        return true; 
    }
    const duplicateIndex = array.findIndex((otherOpponent, otherIndex) => {
        return otherIndex !== index && otherOpponent.name === opponent.name;
    });
    if (duplicateIndex !== -1) {
        return true;
    }
    return false;
});


  return (
    <div style={{backgroundColor: colors.white, color: colors.black, padding: '20px', borderRadius: '15px', minWidth: '325px'}}> 
        {opponents.map((opponent, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: index !== opponents.length - 1 ? '10px' : null }}>
                <TextField
                    error={opponent.error}
                    helperText={opponent.helperText}
                    label={`Player ${index + 1} Name`}
                    value={opponent.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    variant="outlined"
                    style={{width: opponents.length > 0 ? '100%' : null}}
                />
                {index !== 0 && (
                    <Button
                        onClick={() => handleRemovePlayer(index)}
                        variant="outlined"
                        style={{
                            backgroundColor: colors.black,
                            color: colors.white,
                            fontWeight: "bold",
                            margin: "0px 0px 0px 8px",
                            cursor: "pointer",
                            height: '56px',
                            padding: '5px'
                        }}
                    >
                        -
                    </Button>
                )}
                {index === opponents.length - 1 && opponents.length < 3 && (
                    <Button
                        onClick={() => handleAddPlayer(opponent.name, index)}
                        variant="outlined"
                        style={{
                            backgroundColor: colors.blue,
                            color: colors.white,
                            fontWeight: "bold",
                            margin: "0px 0px 0px 8px",
                            cursor: opponent.name ? "pointer" : "not-allowed",
                            height: '56px',
                            padding: '5px'
                        }}
                    >
                    +
                    </Button>
                )}
                
            </div>
        ))}
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Button
                variant="contained"
                color="primary"
                style={{
                    backgroundColor: colors.blue,
                    marginTop: "10px",
                    opacity: isAnyNameBlankWithError ? 0.5 : 1,
                    cursor: isAnyNameBlankWithError ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleStartGame()}
                disabled={isAnyNameBlankWithError}
            >
                <LogoFont
                    text="Start"
                    color={colors.white}
                    fontWeight="bold"
                    fontSize="15px"
                />
            </Button>
        </div>
    </div>
  );
};

export default SignUpScreen;
