import React from 'react';
import './App.css';
import UserActivityComponent from './components/UserActivityComponent';
import QuestionListComponent from './components/QuestionListComponent';
import TabsComponent from './components/TabsComponent';

function App() {

  return (
    <div className="App">
      <h1 className='appName'>an3rd App</h1>
      {/* <UserActivityComponent />
       */}
      {/* <QuestionListComponent /> */}
      <TabsComponent />
    </div>
  );
}

export default App;
