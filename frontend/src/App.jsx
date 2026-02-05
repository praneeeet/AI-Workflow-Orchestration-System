import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WorkflowDetails from './pages/WorkflowDetails';
import ExecutionResult from './pages/ExecutionResult';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/workflow/:id" element={<WorkflowDetails />} />
      <Route path="/execution/:runId" element={<ExecutionResult />} />
    </Routes>
  );
}
