import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import Spinner from '../component/Spinner';
import { FaArrowLeft } from 'react-icons/fa';
import ClientInfo from '../component/ClientInfo';
import DeleteProjectButton from '../component/DeleteProjectButton';
import EditProjectForm from '../component/EditProjectForm';

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });
  if (loading) return <Spinner />;
  if (error) return <div>Something went wroong!</div>;
  const { name, description, status, client } = data.project;
  return (
    <div className="card mx-auto w-75 p-5">
      <Link to="/projects" className="btn btn-secondary  btn-sm w-25 d-inline ms-auto d-flex align-items-center">
        <FaArrowLeft className="me-1" />
        Back
      </Link>
      <h1>{name}</h1>
      <p>{description}</p>
      <h5 className="mt-3">Project Status</h5>
      <p className="lead">{status}</p>
      <ClientInfo client={client}></ClientInfo>
      <DeleteProjectButton projectId={id} />
      <EditProjectForm project={data.project} />
    </div>
  );
}
