import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getWorkflowById, getSteps, runWorkflow } from '../services/api';
import StepForm from '../components/StepForm';
import StepList from '../components/StepList';

export default function WorkflowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loadingWorkflow, setLoadingWorkflow] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [error, setError] = useState(null);
  const [showStepForm, setShowStepForm] = useState(false);
  const [running, setRunning] = useState(false);

  const loadWorkflow = async () => {
    if (!id) return;
    setLoadingWorkflow(true);
    setError(null);
    try {
      const data = await getWorkflowById(id);
      setWorkflow(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load workflow');
    } finally {
      setLoadingWorkflow(false);
    }
  };

  const loadSteps = async () => {
    if (!id) return;
    setLoadingSteps(true);
    try {
      const data = await getSteps(id);
      setSteps(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load steps');
    } finally {
      setLoadingSteps(false);
    }
  };

  useEffect(() => {
    loadWorkflow();
  }, [id]);

  useEffect(() => {
    if (id) loadSteps();
  }, [id, showStepForm]);

  const handleStepAdded = () => {
    setShowStepForm(false);
    loadSteps();
  };

  const handleRun = async () => {
    setRunning(true);
    setError(null);
    try {
      const run = await runWorkflow(id);
      navigate(`/execution/${run.id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to run workflow');
    } finally {
      setRunning(false);
    }
  };

  if (loadingWorkflow && !workflow) {
    return <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>Loading workflow…</div>;
  }
  if (error && !workflow) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
        <p style={{ color: '#b91c1c' }}>{error}</p>
        <Link to="/">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ color: '#2563eb' }}>← Dashboard</Link>
      </nav>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{workflow?.name}</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" style={{ padding: '10px 18px', background: '#f3f4f6', border: 'none', borderRadius: 8 }} onClick={() => setShowStepForm(true)}>Add step</button>
          <button type="button" style={{ padding: '10px 18px', background: '#059669', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600 }} onClick={handleRun} disabled={running || (steps && steps.length === 0)}>{running ? 'Running…' : 'Run workflow'}</button>
        </div>
      </header>
      {error && <div style={{ padding: 12, marginBottom: 16, background: '#fef2f2', color: '#b91c1c', borderRadius: 8 }}>{error}</div>}
      {showStepForm && <StepForm workflowId={id} onSuccess={handleStepAdded} onCancel={() => setShowStepForm(false)} />}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Steps</h2>
      <StepList steps={steps} loading={loadingSteps} />
    </div>
  );
}
