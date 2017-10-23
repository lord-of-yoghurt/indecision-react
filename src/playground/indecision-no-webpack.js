// run babel: babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.options
    };

    this.handleAddOption     = this.handleAddOption.bind(this);
    this.handlePickOption    = this.handlePickOption.bind(this);
    this.handleDeleteOne     = this.handleDeleteOne.bind(this);
    this.handleDeleteAll     = this.handleDeleteAll.bind(this);
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');

      if (json) {
        const options = JSON.parse(json);
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.log("if you've triggered this, you suck.");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  optionExists(option) {
    return this.state.options.indexOf(option) > -1;
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value please!';
    } else if (this.optionExists(option)) {
      return 'Option already exists!';
    }

    this.setState((prevState) => ({ options: [...prevState.options, option] }));
  }

  handlePickOption() {
    const option = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[option]);
  }

  handleDeleteOne(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }

  handleDeleteAll() {
    this.setState(() => ({ options: [] }));
  }

  render() {
    const subtitle = 'Let the heartless, soulless machine decide your fate.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Options
          data={this.state.options}
          hasOptions={this.state.options.length > 0}
          handleDeleteAll={this.handleDeleteAll}
          handleDeleteOne={this.handleDeleteOne}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
        <Action
          hasOptions={this.state.options.length > 1}
          handlePickOption={this.handlePickOption}
        />
      </div>
    );
  }
}

App.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: "Indecision App"
};

const Action = props => {
  return (
    <div>
      <button
        onClick={props.handlePickOption}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
}

const Options = props => {
  return (
    <div>
      <p>
        {props.data.length === 0 ? 'No options for now' : `Here are your options (${props.data.length}):` }
      </p>
      <ol>
        {props.data.map(element => (
          <Option
            key={element}
            value={element}
            handleDeleteOne={props.handleDeleteOne}
          />
        ))}
      </ol>
      <button
        onClick={props.handleDeleteAll}
        disabled={!props.hasOptions}
      >
        Remove all
      </button>
    </div>
  );
}

const Option = props => {
  return (
    <li>
      {props.value}
      <button
        onClick={(e) => {
          props.handleDeleteOne(props.value);
        }}
      >
        Remove
      </button>
    </li>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };

    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();
    const value = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(value);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
