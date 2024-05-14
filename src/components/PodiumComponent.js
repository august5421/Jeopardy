import React, { useState, useEffect } from "react";
import "./components.css";
import LogoFont from "./LogoFont";
import HandwritingFont from "./HandwritingFont";
import { colors } from "../utils/colors";
import { useDispatch, useSelector } from 'react-redux';
import { setCanBuzz, setActiveAnswerer, setIneligiblePlayers} from '../actions/actions'
import CountdownTimer from "./CoundownTimer";

const PodiumComponent = (props) => {
    const dispatch = useDispatch();
    const opponents = useSelector(state => state.opponents);
    const playerTurn = useSelector(state => state.playerTurn);
    const activeAnswerer = useSelector(state => state.activeAnswerer);
    const canBuzz = useSelector(state => state.canBuzz);
    const ineligiblePlayers = useSelector(state => state.ineligiblePlayers);
    const [fontRand, setFontRand] = useState([]);
    const handleMobilebuzzClick = () => {
        if (canBuzz) {
            if (
              !ineligiblePlayers.includes(opponents[0].name)
            ) {
              dispatch(setActiveAnswerer(opponents[0]?.name));
              dispatch(setCanBuzz(false));
              let iPlayers = ineligiblePlayers;
              iPlayers.push(opponents[0].name);
              dispatch(setIneligiblePlayers(iPlayers));
              props.reset();
            }
        }
    }
    useEffect(() => {
    const fontClasses = [
        "HW1",
        "HW2",
        "HW3",
        "HW4",
        "HW5",
        "HW6",
        "HW7",
    ];
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const randomizedFonts = shuffleArray([...fontClasses]).slice(0, 3);
    setFontRand(randomizedFonts);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: props.isDesktop ? 'column-reverse' : 'row', alignItems:'space-between', justifyContent:'center', width: '100%', minHeight: '53px', margin: props.index == 1 && `${!props.isDesktop ? '5px 0px' : '0px 15px'}`}}>
        <div style={{backgroundColor: colors.blue, width: '100%', display:'flex', alignItems: 'center', margin: props.isDesktop ? '0px' : '0px 5px', minHeight: props.isDesktop ? '53px' : null, justifyContent: 'center', color: opponents[props.index].name == playerTurn && activeAnswerer == null ? colors.yellow : colors.white, opacity: ineligiblePlayers.includes(opponents[props.index].name) ? 0.5 : 1}}>
            <HandwritingFont
                text={opponents[props.index].name}
                fontClass={fontRand[props.index]}
            />
        </div>
        <div style={{visibility: props.isDesktop ? 'visible' : 'hidden', height: "31px"}}>
            {activeAnswerer && activeAnswerer == opponents[props.index].name && <CountdownTimer start={true}/>}
        </div>
        <div style={{backgroundColor: colors.blue, width: '100%', minHeight: props.isDesktop ? '53px' : null, display:'flex', justifyContent:'space-between', alignItems: 'center', marginRight: '5px', opacity: ineligiblePlayers.includes(opponents[props.index].name) ? 0.5 : 1}}>
            <div style={{margin:'15px'}}>
                <LogoFont
                    text={opponents[props.index].score}
                    color={colors.white}
                    fontWeight="bold"
                    fontSize={props.isDesktop ? "20px" : "15px"}
                />
            </div>
            {canBuzz && !ineligiblePlayers.includes(opponents[props.index].name) && 
                (<div style={{
                    margin: props.isDesktop ? '0px px' : '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    backgroundColor: colors.black,
                    fontFamily: 'Arial, sans-serif',
                    padding: '5px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    textAlign: 'center',
                }}>
                    {props.isDesktop ? (
                        <>
                            {opponents[props.index].buzzKey}
                            <img src={opponents[props.index].buzzKeyImg} style={{width: "20px", height: "20px", marginLeft: '15px'}}/>
                        </>
                    ) : (
                        <div style={{width: '100%'}} onClick={()=> handleMobilebuzzClick()}>
                            Buzz
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default PodiumComponent;
