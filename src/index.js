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
  easy: 1000,
  normal: 500,
  hard: 250,
  insane: 100,
  imacrazyperson: 50,
  catreflex: 25,
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

const randomLocation = () => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return { x, y };
};

const die = (snake) => {
  const head = snake[snake.length - 1];
  const ateSelf = snake.some(({ x, y }, i) => {
    if (i === snake.length - 1) return false;
    return head.x === x && head.y === y;
  });
  ateSelf && process.exit(0);
  head.x >= 10 && process.exit(0);
  head.x <= 0 && process.exit(0);
  head.y >= 10 && process.exit(0);
  head.y <= 0 && process.exit(0);
};

const App = ({ difficulty = "hard" }) => {
  const [direction, setDirection] = useState(ARROWS.down);
  const [score, setScore] = useState(0);
  const [fruit, setFruit] = useState(randomLocation());
  const [snake, setSnake] = useState(initialSnake);
  const gameClock = useRef(null);

  const tick = () => {
    // snake state variable never seems to change, so use the
    // value passed in. Bug in react-blessed renderer?
    setSnake((s) => {
      die(s);
      const newSnake = [...s];
      const head = { ...s[s.length - 1] };
      const newHead = nextHead(head, direction);
      const ateFruit = newHead.x === fruit.x && newHead.y === fruit.y;
      if (ateFruit) {
        setFruit(() => randomLocation());
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
      DIFFICULTY[difficulty] || DIFFICULTY["hard"]
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
      <box width='80%' top='0' left='0'>
        ~~~ Snake Game | Sam Ogden ~~~
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
        <Fruit {...fruit} />
        {snake.map((part, i) => (
          <BodyPart {...part} isHead={i === snake.length - 1} key={i} />
        ))}
      </box>
    </element>
  );
};

const BodyPart = ({ x, y, isHead }) => {
  return (
    <box
      top={`${y * 10}%`}
      left={`${x * 10}%`}
      width='10%'
      height='10%'
      border='line'
      style={{
        bg: isHead ? "#19EBFF" : "#F3EEE3",
        border: isHead ? { fg: "red" } : { fg: "#F3EEE3" },
      }}
    ></box>
  );
};

const Fruit = ({ x, y }) => {
  return (
    <box
      top={`${y * 10}%`}
      left={`${x * 10}%`}
      width='10%'
      height='10%'
      border='line'
      style={{
        bg: "green",
        border: { fg: "green" },
      }}
    ></box>
  );
};

const screen = blessed.screen({
  autoPadding: true,
  fastCSR: true,
  title: "Snake Game!",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

let difficulty;
try {
  difficulty = process.argv[2].split("--")[1];
} catch (e) {
  difficulty = "hard";
} finally {
  render(<App difficulty={difficulty} />, screen);
}
