import React from "react";
import "./App.less";
import "./App.sass";
const s = require("./App.css");

console.warn(s);

class App extends React.PureComponent {
  private getContent() {
    return <div className=".ccc">Content</div>;
  }

  public render() {
    return (
      <div className={s.vvv}>
        <div className="cds">{this.getContent()}</div>
      </div>
    );
  }
}

export default App;
