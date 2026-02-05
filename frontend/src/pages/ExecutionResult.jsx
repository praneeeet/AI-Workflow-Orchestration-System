import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExecutionResult } from '../services/api';
import ExecutionViewer from '../components/ExecutionViewer';

export default function ExecutionResult() {
  const { runId } = useParams();
  const [run, setRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!runId) return;
    let cancelled = false;
    const fetchRun = async () => {
      try {
        const data = await getExecutionResult(runId);
        if (!cancelled) setRun(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Failed to load execution');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRun();
    return () => { cancelled = true; };
  }, [runId]);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <nav style={{ marginBottom: 24 }}>
        <Link to="/" style={{ color: '#2563eb' }}>← Dashboard</Link>
      </nav>
      <h1 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 600 }}>Execution result</h1>
      <ExecutionViewer run={run} loading={loading} error={error} />
    </div>
  );
}
