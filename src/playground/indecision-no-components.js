const app = {
  title: 'Indecision App',
  subtitle: 'Let the computer make important decisions for you!',
  options: [],
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
}

const pickOption = () => {
  const option = Math.floor(Math.random() * app.options.length);
  alert(app.options[option]);
}

const isDisabled = () => app.options.length < 2;

const clearOptions = () => {
  app.options = [];
  renderApp();
}

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length === 0 ? 'No options for now' : 'Here are your options:'}</p>
      <ol>
        {app.options.map(option => <li key={option}>{option}</li>)}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
      <button disabled={isDisabled()} onClick={pickOption}>What should I do?</button>
      <button onClick={clearOptions}>Clear options</button>
    </div>
  );

  ReactDOM.render(template, appRoot);
}

renderApp();
