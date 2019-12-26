import * as React from "react";

class App extends React.PureComponent {
  private getContent() {
    return <div>Content</div>;
  }

  public render() {
    return <div>{this.getContent()}</div>;
  }
}

export default App;
