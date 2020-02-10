import * as React from "react";

interface IInjectComponentProps {
  Component: React.ComponentType<any>;
}

export class InjectComponent<ComponentProps> extends React.PureComponent<
  IInjectComponentProps & ComponentProps
> {
  render() {
    const { Component, ...rest } = this.props;

    if (!Component) {
      return null;
    }
    //@ts-ignore
    return <Component {...rest} />;
  }
}
