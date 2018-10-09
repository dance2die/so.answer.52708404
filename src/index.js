import React from "react";
import ReactDOM from "react-dom";

const withTimer = WrappedComponent => {
  return class TimerComponent extends React.Component {
    state = { time: 0 };
    intervalId = 0;

    increase = () => this.setState(state => ({ time: state.time + 1 }));

    componentDidMount() {
      this.intervalId = setInterval(() => {
        this.increase();
      }, 1000);
    }

    componentWillMount() {
      clearInterval(this.intervalId);
    }

    render() {
      const { time } = this.state;
      return <WrappedComponent time={time} />;
    }
  };
};

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>TimeDisplay wrapped in HoF (High-order function)</h2>
        <WrappedTimerDisplay />
        <h2>Reguarl TimeDisplay</h2>
        <TimerDisplay time={999} />
      </div>
    );
  }
}

const TimerDisplay = ({ time }) => <div>{time}</div>;
const WrappedTimerDisplay = withTimer(TimerDisplay);

ReactDOM.render(
  <App component1={<TimerDisplay />} component2={<TimerDisplay />} />,
  document.querySelector("#root")
);
