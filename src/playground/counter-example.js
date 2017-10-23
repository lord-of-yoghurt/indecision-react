class Counter extends React.Component{
  constructor(props) {
    super(props);

    // set up default state
    this.state = {
      count: props.count
    }

    this.plusOne = this.plusOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  componentDidMount() {
    const json = localStorage.getItem('counter');
    const count = parseInt(json, 10);

    if (!isNaN(count)) {
      this.setState(() => ({ count }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      const json = JSON.stringify(this.state.count);
      localStorage.setItem('counter', json);
    }
  }

  plusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  minusOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }

  resetCount() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }

  render() {
    return (
      <div>
        {/* use the state */}
        <h1>Current count: {this.state.count}</h1>
        <button onClick={this.plusOne}>+1</button>
        <button onClick={this.minusOne}>-1</button>
        <button onClick={this.resetCount}>Reset</button>
      </div>
    )
  }
}

Counter.defaultProps = {
  count: 0
};

ReactDOM.render(<Counter />, document.getElementById('app'));
