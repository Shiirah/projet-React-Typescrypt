import { Route, Routes, useParams } from 'react-router'

import './App.css'
import { Layout } from './components/Layout';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { NewProjectPage } from './pages/NewProjectPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* le layout entoure toutes les pages */}
      <Route element={<Layout />}>
        <Route index element={<ProjectsPage />} />
        <Route path="projects/new" element={<NewProjectPage />} />
        <Route path="projects/:id" element={<ProjectRoute />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

// key = page neuve quand on change de projet
function ProjectRoute() {
  const { id = "" } = useParams();
  return <ProjectPage key={id} id={id} />;
}
