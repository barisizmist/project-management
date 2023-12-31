import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/projectMutations.js';
import { GET_PROJECTS } from '../queries/projectQueries.js';
import { GET_CLIENTS } from '../queries/clientQueries.js';
import { useMutation, useQuery } from '@apollo/client';

export default function AddProjectModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] }
      });
    }
  });

  // const [addClient] = useMutation(ADD_CLIENT, {
  //   variables: { name, email, phone },
  //   update(cache, { data: { addClient } }) {
  //     const { clients } = cache.readQuery({
  //       query: GET_PROJECTS
  //     });
  //     cache.writeQuery({
  //       query: GET_PROJECTS,
  //       data: { clients: [...clients, addClient] }
  //     });
  //   }
  // });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) return alert('Please fill in all required fields');
    addProject(description, name, status, clientId);
    setName('');
    setDescription('');
    setStatus('');
    setClientId('');
  };
  if (loading) return null;
  if (error) return <p>Somthing went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div>
              <FaList />
              <div>New Project</div>
            </div>
          </button>

          <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea type="text" className="form-control" id="email" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select id="clientId" className="form-select" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
