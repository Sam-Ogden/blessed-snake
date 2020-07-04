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
  easy: 100,
  normal: 50,
  hard: 25,
  insane: 10,
  imacrazyperson: 5,
  catreflex: 3,
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
  const ateSelf = snake.some(({ x, y }, i) => {
    if (i === snake.length - 1) return false;
    return head.x === x && head.y === y;
  });
  return (
    ateSelf || ateSelf || head.x >= n || head.x < 0 || head.y >= n || head.y < 0
  );
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
  const tick = () => {
    // snake state variable never seems to change, so use the
    // value passed in. Bug in react-blessed renderer?
    setSnake((s) => {
      const died = hasDied(s, size);
      died && setGameOver(true);
      const newSnake = [...s];
      const head = { ...s[s.length - 1] };
      const newHead = nextHead(head, direction);
      const ateFruit = newHead.x === fruit.x && newHead.y === fruit.y;
      if (ateFruit) {
        setFruit(() => randomLocation(size));
        setScore((s) => s + 1);
      } else {
        newSnake.shift();
      }
      newSnake.push(newHead);
      return newSnake;
    });
  };

  useEffect(() => {
    clearInterval(gameClock.current);
    gameClock.current = setInterval(
      tick,
      Math.pow(size, 0.5) * (DIFFICULTY[difficulty] || DIFFICULTY["hard"])
    );
    return () => clearInterval(gameClock.current);
  }, [direction]);

  const handleKeyPress = (_, { name }) =>
    setDirection((direction) => ARROWS[name] || direction);

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

const BodyPart = ({ x, y, isHead, size }) => {
  return (
    <box
      top={`${y * size}%`}
      left={`${x * size}%`}
      width={`${size}%`}
      height={`${size}%`}
      style={{
        bg: isHead ? "#19EBFF" : "#F3EEE3",
      }}
    ></box>
  );
};

const Fruit = ({ x, y, size }) => {
  return (
    <box
      top={`${y * size}%`}
      left={`${x * size}%`}
      width={`${size}%`}
      height={`${size}%`}
      style={{
        bg: "green",
      }}
    ></box>
  );
};

const GameOver = ({ restart, score }) => {
  return (
    <box top='center' left='center'>
      GAME OVER - Score:
      <box top={1}>{score}</box>
      <button mouse top={2} height={50} width={"100%"} onPress={restart}>
        -- Click to play again --
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

let difficulty, size;
const args = process.argv;
try {
  difficulty = args[args.findIndex((arg) => arg === "--difficulty") + 1];
  size = args[args.findIndex((arg) => arg === "--size") + 1];
} catch (e) {
  console.log(e);
  difficulty = "hard";
  size = 20;
} finally {
  render(<App difficulty={difficulty} size={size} />, screen);
}
