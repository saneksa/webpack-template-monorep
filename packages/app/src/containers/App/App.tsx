import * as React from "react";
import "./App.less";
import "./App.css";
import "./App.sass";

class App extends React.PureComponent {
  private getContent() {
    return <div className=".ccc">Content</div>;
  }

  public render() {
    return (
      <div className="vvv">
        <div className="cds">{this.getContent()}</div>
      </div>
    );
  }
}

export default App;
