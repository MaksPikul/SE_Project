import React from "react";
import {Text} from "react-native";
import {useState, useEffect, useCallback} from "react";

const ShowMoreShowLess = ({text, textStyle, readMoreStyle} :
    {text : String , textStyle : any , readMoreStyle : any}) => {
    const [readMoreButton, setReadMoreButton] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [numLines, setNumLines] = useState(4);
  
    const toggleTextShown = () => {
      setTextShown(!textShown);
    };
  
    useEffect(() => {
      setNumLines(textShown ? 999999999999 : 4);
    }, [textShown]);
  
    const onTextLayout = useCallback(
      (e : any) => {
        if (e.nativeEvent.lines.length > 4 && !textShown) {
          setReadMoreButton(true);
          setNumLines(4);
        }
      },
      [textShown],
    );
  
    return (
      <>
        <Text onTextLayout={onTextLayout} numberOfLines={numLines} ellipsizeMode="tail" style={textStyle}>
          {text}
        </Text>
  
        {readMoreButton ? (
          <Text onPress={toggleTextShown} style={readMoreStyle}>
            {textShown ? 'Read Less' : 'Read More'}
          </Text>
        ) : null}
      </>
    );
  };

  export default ShowMoreShowLess;