module Hello = {
  let component = ReasonReact.statelessComponent("Hello");

  let make = _children => {
    ...component,
    render: _self =>
      <div> <h1> {ReasonReact.string("Hello World coy")} </h1> </div>,
  };
};

ReactDOMRe.renderToElementWithId(<Hello />, "root");