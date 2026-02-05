import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkflows, deleteWorkflow } from '../services/api';
import WorkflowForm from '../components/WorkflowForm';

export default function Dashboard() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchWorkflows = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWorkflows();
      setWorkflows(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const handleCreate = async () => {
    setShowForm(false);
    fetchWorkflows();
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Delete this workflow?')) return;
    try {
      await deleteWorkflow(id);
      setWorkflows((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete');
    }
  };

  const pageStyle = { maxWidth: 720, margin: '0 auto', padding: 24 };
  const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 };
  const titleStyle = { margin: 0, fontSize: 24, fontWeight: 600 };
  const btnStyle = { padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600 };
  const errorStyle = { padding: 12, marginBottom: 16, background: '#fef2f2', color: '#b91c1c', borderRadius: 8 };
  const mutedStyle = { color: '#6b7280', margin: '24px 0' };
  const listStyle = { listStyle: 'none', padding: 0, margin: 0 };
  const cardStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, marginBottom: 8, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
  const cardLinkStyle = { flex: 1, color: 'inherit', textDecoration: 'none' };
  const delBtnStyle = { padding: '6px 12px', background: 'transparent', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: 6, fontSize: 14 };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>AI Workflow Builder</h1>
        <button type="button" style={btnStyle} onClick={() => setShowForm(true)}>New Workflow</button>
      </header>
      {showForm && <WorkflowForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
      {error && <div style={errorStyle}>{error}</div>}
      {loading && <p style={mutedStyle}>Loading workflows…</p>}
      {!loading && workflows.length === 0 && <p style={mutedStyle}>No workflows yet. Create one to get started.</p>}
      {!loading && workflows.length > 0 && (
        <ul style={listStyle}>
          {workflows.map((w) => (
            <li key={w.id} style={cardStyle}>
              <Link to={`/workflow/${w.id}`} style={cardLinkStyle}>
                <span style={{ fontWeight: 600 }}>{w.name}</span>
                <span style={{ fontSize: 14, color: '#6b7280' }}>{w.createdAt ? new Date(w.createdAt).toLocaleDateString() : ''}</span>
              </Link>
              <button type="button" style={delBtnStyle} onClick={(e) => handleDelete(w.id, e)} aria-label="Delete">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
