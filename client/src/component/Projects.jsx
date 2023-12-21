import { useQuery } from '@apollo/client';
import Spinner from './Spinner';
import { GET_PROJECTS } from '../queries/projectQueries';
import ProjectRow from './ProjectRow';

export default function Projects() {
  const { loading, data, error } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <div>Something went wroong!</div>;
  return (
    <>
      <div className="row">
        {data.projects?.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
