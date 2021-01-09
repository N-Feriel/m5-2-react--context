import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



import cookieSrc from "../cookie.svg";
import cursor from "../cursor.png";
import Item from "./Item";
import {GameContext} from './GameContext';
import {items} from '../data';


const Game = () => {


  const {numCookies, setNumCookies, purchasedItems, 
        setPurchasedItems, cookiesPerSecond
      } = useContext(GameContext); 

  const incrementCookies = () => {
    setNumCookies((c) => c + 1);
  };

  React.useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [numCookies]);

  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === "Space") {
        incrementCookies();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });




  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{cookiesPerSecond}</strong> cookies
          per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
          <Cookie />
          <CursorContainer>
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />
            <Cursor src={cursor} />

          </CursorContainer>
          
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          return (
            <Item
              key={item.id}
              index={index}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleAttemptedPurchase={() => {
                if (numCookies < item.cost) {
                  alert("Cannot afford item");
                  return;
                }

                setNumCookies(numCookies - item.cost);
                setPurchasedItems({
                  ...purchasedItems,
                  [item.id]: purchasedItems[item.id] + 1,
                });
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;
  position: relative;

  &:active {
    transform: scale(0.9);
  }
`;

const Cookie = styled.img`
  position: absolute;
  width: 300px;
  margin-left: -150px;
  padding: 40px

`;

const Cursor = styled.img`
  position: absolute;
  transform: scaleY(-1);
  width: 30px;
`;

const CursorContainer = styled.div`
    position: absolute;
    transform-origin: 50% 150px;
    line-height: 1;
    animation: Cursor-Spin  50s linear infinite;

@keyframes Cursor-Spin {
  from{
      transform: rotate(0);
  }
  to{
      transform: rotate(360deg) ;
  }
  }
`

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
