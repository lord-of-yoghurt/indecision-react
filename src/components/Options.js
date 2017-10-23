import React from 'react';
import Option from './Option';

const Options = props => {
  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">
          {props.data.length === 0 ? 'No options for now' : 'Here are your options:' }
        </h3>
        <button
          className="button button--link"
          onClick={props.handleDeleteAll}
          disabled={!props.hasOptions}
        >
          Remove all
        </button>
      </div>

      {props.data.length === 0 && <p className="widget__message">Add a couple of options to get started!</p>}

      {props.data.map((element, idx) => (
        <Option
          key={element}
          value={element}
          count={idx + 1}
          handleDeleteOne={props.handleDeleteOne}
        />
      ))}
    </div>
  );
}

export default Options;
