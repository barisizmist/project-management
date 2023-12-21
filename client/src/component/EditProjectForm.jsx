import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case 'Not Started':
        return 'new';
      case 'In Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    // update(cache, { data: { updateProject } }) {
    //   const { projects } = cache.readQuery({ query: GET_PROJECT });
    //   cache.writeQuery({
    //     query: GET_PROJECT,
    //     data: { projects: [...projects, updateProject] }
    //   });
    // }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !status) return alert('Please fill in all required fields');
    updateProject(description, name, status);
    // setName('');
    // setDescription('');
    // setStatus('');
    // setClientId('');
  };

  return (
    <div>
      <h2>Update Project</h2>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
