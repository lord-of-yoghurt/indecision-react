class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleVisibility}>
          {this.state.visible ? 'Hide details' : 'Show details'}
        </button>
        {this.state.visible && (
          <p>Revealing the hidden details...</p>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
