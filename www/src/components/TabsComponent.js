import React, { useState } from 'react';
import UserActivityComponent from './UserActivityComponent';
import QuestionListComponent from './QuestionListComponent';

function Tab({ isActive, onClick, label }) {
  return (
    <button
      style={{
        padding: '10px',
        margin: '5px',
        backgroundColor: isActive ? 'blue' : 'gray',
        color: 'white',
        border: 'none',
        borderBottom: isActive ? '2px solid black' : 'none'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
function TabsComponent() {
  const [activeTab, setActiveTab] = useState('tab1');

  const content = {
    tab1: <UserActivityComponent />,
    tab2: <QuestionListComponent />
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tab isActive={activeTab === 'tab1'} onClick={() => setActiveTab('tab1')} label="User Activity" />
        <Tab isActive={activeTab === 'tab2'} onClick={() => setActiveTab('tab2')} label="All Questions" />
      </div>
      <div style={{ padding: '20px', marginTop: '10px', border: '1px solid #ddd' }}>
        {content[activeTab]}
      </div>
    </div>
  );
}

export default TabsComponent;