'use client';
import { Component } from "react";
import { ReactSortable } from "react-sortablejs";

interface SortableTestState {
  list: { id: number; name: string; url: string }[];
}

export class SortableTest extends Component<{}, SortableTestState> {
  state: SortableTestState = {
    list: [
      { id: 1, name: "Payne", url: "https://www.celebheights.com/tr/l/liampayne.jpg" },
      { id: 2, name: "Trump", url: "https://www.celebheights.com/tr/d/donaldtrump.jpg" }, 
      { id: 3, name: "Diddy", url: "https://www.celebheights.com/tr/p/pdiddy.jpg" },
      { id: 4, name: "Pitt", url: "https://www.celebheights.com/tr/b/bradpitt.jpg" },
      { id: 5, name: "Holland", url: "https://www.celebheights.com/tr/t/tomholland.jpg" }, 
      { id: 6, name: "Beiber", url: "https://www.celebheights.com/tr/j/justinbieber.jpg" },
      { id: 7, name: "Cruie", url: "https://www.celebheights.com/tr/t/tomcruise.jpg" },
    ],
  };
  render() {
    return (
      <ReactSortable
        list={this.state.list}
        setList={(newState) => this.setState({ list: newState })}
        className="grid gap-0.5 sm:gap-1"
      >
          {this.state.list.map((item) => (
            <div key={item.id} className="border-2 sm:border-4 border-[var(--accent)] overflow-clip">
              <img src={item.url} alt={item.name} className="object-cover "/>
            </div>
          ))}
      </ReactSortable>
    );
  }
}