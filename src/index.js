#!/usr/bin/env node
import React, { useState, useEffect, useRef } from "react";
import blessed from "blessed";
import { render } from "react-blessed";

const ARROWS = {
  left: "left",
  down: "down",
  up: "up",
  right: "right",
  a: "left",
  s: "down",
  w: "up",
  d: "right",
};

const DIFFICULTY = {
  easy: 500,
  normal: 250,
  hard: 200,
  insane: 100,
  catreflex: 50,
};

const initialSnake = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },
];

const nextHead = ({ x, y }, direction) => {
  switch (direction) {
    case ARROWS.left:
      return { x: x - 1, y };
    case ARROWS.right:
      return { x: x + 1, y };
    case ARROWS.up:
      return { x, y: y - 1 };
    case ARROWS.down:
      return { x, y: y + 1 };
    default:
      return head;
  }
};

const randomLocation = (n) => {
  const x = Math.floor(Math.random() * n);
  const y = Math.floor(Math.random() * n);
  return { x, y };
};

const hasDied = (snake, n) => {
  const head = snake[snake.length - 1];
  const ateSelf = snake.some(
    ({ x, y }, i) => i !== snake.length - 1 && head.x === x && head.y === y
  );
  const outOfBounds = head.x >= n || head.x < 0 || head.y >= n || head.y < 0;
  return ateSelf || outOfBounds;
};

const App = ({ difficulty = "hard", size = 20 }) => {
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState(ARROWS.down);
  const [score, setScore] = useState(0);
  const [fruit, setFruit] = useState(randomLocation(size));
  const [snake, setSnake] = useState(initialSnake);
  const gameClock = useRef(null);

  const restart = () => {
    setSnake(initialSnake);
    setScore(0);
    setDirection(ARROWS.down);
    setGameOver(false);
    setFruit(randomLocation(size));
  };

  const handleDeath = () => {
    setGameOver(true);
    clearTimeout(gameClock.current);
  };

  const handleAteFruit = () => {
    setFruit(() => randomLocation(size));
    setScore((s) => s + 1);
  };

  const tick = () => {
    setSnake((s) => {
      hasDied(s, size) && handleDeath();
      const newSnake = [...s];
      const newHead = nextHead(s[s.length - 1], direction);
      const ateFruit = newHead.x === fruit.x && newHead.y === fruit.y;
      ateFruit ? handleAteFruit() : newSnake.shift();
      newSnake.push(newHead);
      return newSnake;
    });
  };

  useEffect(() => {
    if (!gameOver) {
      clearInterval(gameClock.current);
      gameClock.current = setInterval(
        tick,
        (10 / size) * (DIFFICULTY[difficulty] || DIFFICULTY["hard"])
      );
    }
    return () => clearInterval(gameClock.current);
  }, [direction, gameOver]);

  const handleKeyPress = (_, { name }) =>
    name === "enter"
      ? restart()
      : setDirection((direction) => ARROWS[name] || direction);

  return (
    <element
      keyable={true}
      focused={true}
      input={true}
      width='100%'
      height='100%'
      onKeypress={handleKeyPress}
      style={{
        bg: "#2A223A",
        fg: "#2A223A",
      }}
    >
      {!gameOver ? (
        <>
          <box width='80%' top='0' left='0'>
            ~~~ Snake Game ~~~
          </box>
          <box width='20%' top='0' right='0'>
            <box width='50%' top='0' right='15'>
              Score
            </box>
            <box width='50%' top='0' right='5'>
              {score}
            </box>
          </box>
          <box
            top='center'
            left='center'
            width='90%'
            height='90%'
            border={{ type: "line" }}
            style={{
              border: { fg: "red" },
            }}
          >
            <Fruit {...fruit} size={Math.floor(100 / size)} />
            {snake.map((part, i) => (
              <BodyPart
                {...part}
                isHead={i === snake.length - 1}
                key={i}
                size={Math.floor(100 / size)}
              />
            ))}
          </box>
        </>
      ) : (
        <GameOver score={score} restart={restart} />
      )}
    </element>
  );
};

const getPositionProps = (x, y, size) => ({
  top: `${y * size}%`,
  left: `${x * size}%`,
  width: `${size}%`,
  height: `${size}%`,
});

const BodyPart = ({ x, y, isHead, size }) => {
  return (
    <box
      {...getPositionProps(x, y, size)}
      style={{
        bg: isHead ? "#19EBFF" : "#F3EEE3",
      }}
    ></box>
  );
};

const Fruit = ({ x, y, size }) => {
  return (
    <box
      {...getPositionProps(x, y, size)}
      style={{
        bg: "green",
      }}
    ></box>
  );
};

const GameOver = ({ restart, score }) => {
  return (
    <box top='center' left='center' width='100%' height='100%'>
      GAME OVER - Score:
      <box top={1}>{score}</box>
      <button mouse top={2} height={50} width={"100%"} onPress={restart}>
        -- Press enter to play again --
      </button>
    </box>
  );
};

const screen = blessed.screen({
  autoPadding: false,
  fastCSR: true,
  title: "Snake Game!",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

const args = process.argv;
const difficultyIndex = args.findIndex((arg) => arg === "--difficulty");
const sizeIndex = args.findIndex((arg) => arg === "--size");
const difficulty = difficultyIndex > -1 ? args[difficultyIndex + 1] : "normal";
const size = sizeIndex > -1 ? args[sizeIndex + 1] : 10;
console.log(`

 _______  __    _  _______  ___   _  _______    _______  _______  __   __  _______ 
|       ||  |  | ||   _   ||   | | ||       |  |       ||   _   ||  |_|  ||       |
|  _____||   |_| ||  |_|  ||   |_| ||    ___|  |    ___||  |_|  ||       ||    ___|
| |_____ |       ||       ||      _||   |___   |   | __ |       ||       ||   |___ 
|_____  ||  _    ||       ||     |_ |    ___|  |   ||  ||       ||       ||    ___|
 _____| || | |   ||   _   ||    _  ||   |___   |   |_| ||   _   || ||_|| ||   |___ 
|_______||_|  |__||__| |__||___| |_||_______|  |_______||__| |__||_|   |_||_______|

    --difficulty easy|normal|hard|insane|catreflex

    --size n

    Resize the terminal to be square
`);

render(<App difficulty={difficulty} size={size} />, screen);
