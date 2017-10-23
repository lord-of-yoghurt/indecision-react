import React, { Component } from 'react';

import Header from './Header';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends Component {
  state = {
    options: this.props.options,
    selectedOption: null,
  };

  optionExists = option => {
    return this.state.options.indexOf(option) > -1;
  };

  handleAddOption = option => {
    if (!option) {
      return 'Can\'t enter an empty option, silly!';
    } else if (this.optionExists(option)) {
      return 'Option already exists!';
    }

    this.setState((prevState) => ({ options: [...prevState.options, option] }));
  };

  handlePickOption = () => {
    const randOption = Math.floor(Math.random() * this.state.options.length);

    this.setState(() => {
      return {
        selectedOption: this.state.options[randOption]
      };
    });
  };

  handleDeleteOne = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };

  handleDeleteAll = () => {
    this.setState(() => ({ options: [] }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ selectedOption: null }));
  };

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

  render() {
    const subtitle = 'Let the heartless machine decide your fate';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 1}
            handlePickOption={this.handlePickOption}
          />
          <div className="widget">
            <Options
              data={this.state.options}
              hasOptions={this.state.options.length > 0}
              handleDeleteAll={this.handleDeleteAll}
              handleDeleteOne={this.handleDeleteOne}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};
