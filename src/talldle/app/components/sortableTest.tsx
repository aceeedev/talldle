'use client';
import { Component } from "react";
import { Sortable, ReactSortable } from "react-sortablejs";

interface SortableTestState {
  list: { id: number; name: string; url: string }[];
}

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

export class SortableTest extends Component<{}, SortableTestState> {
  state: SortableTestState = {
    list: [
      { id: 1, name: "Liam Payne", url: "https://www.celebheights.com/tr/l/liampayne.jpg" },
      { id: 2, name: "Donald Trump", url: "https://www.celebheights.com/tr/d/donaldtrump.jpg" }, 
      { id: 3, name: "P Diddy", url: "https://www.celebheights.com/tr/p/pdiddy.jpg" },
      { id: 4, name: "Brad Pitt", url: "https://www.celebheights.com/tr/b/bradpitt.jpg" },
      { id: 5, name: "Tom Holland", url: "https://www.celebheights.com/tr/t/tomholland.jpg" }, 
      { id: 6, name: "Justin Beiber", url: "https://www.celebheights.com/tr/j/justinbieber.jpg" },
      { id: 7, name: "Tom Cruise", url: "https://www.celebheights.com/tr/t/tomcruise.jpg" },
    ],
  };
  render() {
    return (
      <ReactSortable
        id="sortable"
        animation={100}
        chosenClass="dragging"
        list={this.state.list}
        setList={(newState) => this.setState({ list: newState })}
        onChoose={(e) => {removeTooltips(); }}
        onUnchoose={(e) => {addTooltips(); }}
        className="grid grid-rows-7 gap-0.5 sm:gap-1"
      >
          {this.state.list.map((item) => (
            <div key={item.id} className="tooltip-container border-2 sm:border-4 border-[var(--dark-accent)] overflow-clip hover:cursor-pointer select-none">
              <img src={item.url} alt={item.name} className="object-cover "/>
              <aside className="tooltip-active tooltip">{item.name}</aside>
            </div>
          ))}
      </ReactSortable>
    );
  }
}