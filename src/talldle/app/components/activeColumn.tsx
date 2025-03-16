'use client';
import { Component } from "react";
import { Sortable, ReactSortable } from "react-sortablejs";
import { useState, useEffect } from 'react';
import { Guess } from "./../useGameState"

function addTooltips() {
  const elements = document.getElementsByClassName("tooltip")
  setTimeout(() => {
    if (elements) {
      for (const el of elements) {
        el.classList.add("tooltip-active");
      }
    }
  }, 100)
}

function removeTooltips() {
  const elements = document.getElementsByClassName("tooltip")
  if (elements) {
    for (const el of elements) {
      el.classList.remove("tooltip-active");
    }
  }
}

export function ActiveColumn({ order }: { order: Array<Guess> }) {
  const [list, setList] = useState(order);

  useEffect(() => {
    setList(order);
  }, [order]);
  
  return (
    <ReactSortable
      animation={100}
      // chosenClass="dragging"
      filter="no-drag"
      list={list}
      setList={setList}
      onChoose={removeTooltips}
      onUnchoose={addTooltips}
      className="grid grid-rows-7 gap-0.5 sm:gap-1"
    >
      {list?.length > 0 ? (
        list.map((item) => (
          <div key={item.celebs[0].id} className="tooltip-container border-2 sm:border-4 border-[var(--dark-accent)] overflow-clip hover:cursor-pointer select-none">
            <img src={item.celebs[0].imgUrl} alt={item.celebs[0].name} className="object-cover" />
            <aside className="tooltip-active tooltip">{item.celebs[0].name}</aside>
          </div>
        ))
      ) : (
        [...Array(7)].map((_, i) => (
          <div className="no-drag border-2 sm:border-4 bg-[var(--dark-accent)] border-[var(--dark-accent)] opacity-35 aspect-square"></div>
        ))
      )}
    </ReactSortable>
  );
};