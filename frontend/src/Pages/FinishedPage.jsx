import React, { Component } from 'react';

class FinishedPage extends Component {
  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onBackButtonEvent);
  }

  onBackButtonEvent = (e) => {
    e.preventDefault();
    window.history.pushState(null, null, window.location.pathname);
  };

  render() {
    return (
      <div className='bg-color-gradient page w-full'>
          <h1 className='text-4xl lg:text-6xl text-white font-bold text-center animate-bounce'>Your answers have been submitted!!!</h1>
      </div>
    );
  }
}

export default FinishedPage;
