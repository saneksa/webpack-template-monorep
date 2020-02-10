import * as React from "react";
import "./App.less";
import "./App.css";
import "./App.sass";

import { InjectConfig } from "@monorep/expander/src/InjectConfig";
import { InjectComponent } from "@monorep/expander/src/InjectComponent";

interface IInjectableConfig {
  injectableProperty?: IIAppConfig;
}

export class IIAppConfig {}

class App extends React.PureComponent implements IInjectableConfig {
  @InjectConfig public injectableProperty?: IIAppConfig;

  private getContent() {
    return <div className=".ccc">Content</div>;
  }

  public render() {
    return (
      <div className="vvv">
        <InjectComponent
          Component={this.injectableProperty as React.ComponentType<any>}
          ss="fdfsf"
          asdada={3}
        />
        <div className="cds">{this.getContent()}</div>
      </div>
    );
  }
}

export default App;
