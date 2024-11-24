import React from 'react';
import Header from './components/Header'; 
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import ProfileForm from './components/ProfileForm';

const App = () => {
  return (
    <div className="container my-5">
      <Header />
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-start">
          <div style={{ marginTop: '100px' }}>
            <Projects />
            <Tasks />
          </div>
        </div>
        <div className="col-md-6">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default App;
