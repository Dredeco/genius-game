'use client'

import React, { ReactElement, ReactHTMLElement, ScriptHTMLAttributes, useEffect } from "react";

export default function Home() {
  // VARIABLES
  let order: number[] = [];
  let clickedOrder: number[] = []; // 0-Green 1-Red 2-Yellow 3-Blue
  let score: number = 0;
  let green: HTMLDivElement | null;
  let red: HTMLDivElement | null;
  let yellow: HTMLDivElement | null;
  let blue: HTMLDivElement | null;

  useEffect(() => {
    if (typeof window !== undefined) {
      green = document.querySelector('.green')
      red  = document.querySelector('.red')
      yellow = document.querySelector('.yellow')
      blue = document.querySelector('.blue')
    }
      playGame()
  }, [])
  // FUNCTIONS

  // create a random color order
    const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
      let elementColor = createColorElement(order[i]);
      lightColor(elementColor, Number(i) + 1)
    }
  }

  // light up the next color
  const lightColor = (element: HTMLDivElement | null, number: number) => {
    if (typeof window !== undefined) {
      number = number * 500;
      setTimeout(() => {
        element?.classList.add('selected')
      }, number - 250);
      setTimeout(() => {
        element?.classList.remove('selected')
      }, number + 250);
    }
  }

  // check if the clicked order is equal to created order
  const checkOrder = () => {
    for(let i in clickedOrder) {
      if(clickedOrder[i] != order[i]) {
        gameOver();
        break;
      }
    }
    if(clickedOrder.length == order.length) {
      alert(`Pontuação: ${score} \n Você acertou! Iniciando próximo nível`)
      nextLevel();
    }
  }

  // function to get user click
  const click = (color: number) => {
      clickedOrder[clickedOrder.length] = color;
      createColorElement(color)?.classList.add('selected')
  
      setTimeout(() => {
        createColorElement(color)?.classList.remove('selected')
        checkOrder();
      }, 250)
  }

  // function to get color
  const createColorElement = (color: number) => {
    if(color == 0) {
      return green;
    } else if(color == 1) {
      return red
    } else if(color == 2) {
      return yellow
    } else {
      return blue
    }
  }

  // function to next game level
  const nextLevel = () => {
    score++
    shuffleOrder();
  }

  // function to game over
  const gameOver = () => {
    alert(`Pontuação: ${score} \nVocê perdeu o jogo! \nClique no OK para iniciar um novo jogo.`)
    order = []
    clickedOrder = []

    playGame()
  }

  // function to start
  let playGame = () => {
    if (typeof window !== undefined) {
      alert('Bem vindo ao Gênesis! Iniciando novo jogo!')
      score = 0;

      nextLevel();
    }
  }

  // APPLICATION
  return (
    <main
      className={`
        flex
        h-screen
        justify-center
        items-center
      `}
    >
      <div className={
        `genius 
        grid 
        border-[10px] 
      border-black
      bg-black
        rounded-full
        mt-5
        w-full
        max-w-[700px]
        max-h-[700px]
        h-[700px]
        min-h-[48%]`
      }
      >
        <div className={`
          blue
          bg-blue-700
          rounded-br-full
        `} onClick={() => click(3)} />
        <div className={`
          red
          bg-red-700
          rounded-tr-full
        `} onClick={() => click(1)} />
        <div className={`
          yellow
          bg-yellow-400
          rounded-bl-full
        `} onClick={() => click(2)} />
        <div className={`
          green
          bg-green-700
          rounded-tl-full
        `} onClick={() => click(0)} />
      </div>
    </main>
  )
}
