import React, { Component } from "react";
import "./App.css";

class UISelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isOpen: false,
      searchText: "",
      cursor: 0
    };
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  click(index) {
    console.log("id: " + index + "name: " + this.props.options[index].name);
    this.setState({ selected: index });
  }

  showItem(item) {
    return (
      this.state.searchText === "" || item.indexOf(this.state.searchText) !== -1
    );
  }
  handleKeyDown(e) {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && this.state.cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (
      e.keyCode === 40 &&
      this.state.cursor < this.props.options.length - 1
    ) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
  }

  onChange(e) {
    this.setState({ isOpen: true });
    let value;
    switch (true) {
      case e === null:
        value = "";
        break;
      case typeof e.target === "undefined":
        value = e;
        break;
      default:
        value = e.target["value"];
    }

    this.setState(oldState => {
      oldState.searchText = value;
      return oldState;
    });
  }
  handleClickOutside() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div
        className="main-wrapper"
        onKeyDown={e => this.handleKeyDown(e)}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
      >
        <div className="selector-close">
          {this.state.isOpen ? (
            <input
              className="choose"
              type="text"
              placeholder="חפש"
              onChange={e => this.onChange(e)}
            />
          ) : (
            <span className="display-text">
              {this.props.options[this.state.selected].name}
            </span>
          )}
          <span className="arrow">
            {this.state.isOpen ? (
              <i className="arrow up" />
            ) : (
              <i className="arrow down" />
            )}
          </span>
        </div>

        {this.state.isOpen && (
          <div className="drop-list">
            <div className="arrow-up" />
            <ul className="wrapper flex flex-column">
              {this.props.options.map((item, index) => {
                if (this.showItem(item.name)) {
                  return (
                    <li
                      className={`overflow-ellipsis`}
                      style={
                        this.state.cursor === index
                          ? { backgroundColor: "#ddd" }
                          : {}
                      }
                      onClick={() => this.click(index)}
                      key={index}
                    >
                      {item.name}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default UISelect;
