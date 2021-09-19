import { observer } from "mobx-react";
import React from "react";
import type { RouteComponentProps } from "react-router";
import "./App.less";

interface IAppProps extends RouteComponentProps {}

class App extends React.PureComponent<IAppProps> {
  private getContent() {
    return <div>Content</div>;
  }

  public render() {
    this.props.staticContext;
    return (
      <div>
        <div>{this.getContent()}</div>
      </div>
    );
  }
}

export default observer(App);
