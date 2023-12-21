import React from 'react';
import AddClientModal from '../component/AddClientModal';
import Projects from '../component/Projects';
import Clients from '../component/Clients';
import AddProjectModal from '../component/AddProjectModal';

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      {/* <Projects />
      <hr />
      <Clients /> */}
    </>
  );
}
