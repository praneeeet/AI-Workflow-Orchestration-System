import { useState } from 'react';
import { createWorkflow } from '../services/api';

export default function WorkflowForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    try {
      await createWorkflow(trimmed);
      setName('');
      onSubmit?.();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <div style={formStyles.row}>
        <label htmlFor="workflow-name" style={formStyles.label}>
          Workflow name
        </label>
        <input
          id="workflow-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="My workflow"
          style={formStyles.input}
          autoFocus
          disabled={loading}
        />
      </div>
      {error && <div style={formStyles.error}>{error}</div>}
      <div style={formStyles.actions}>
        <button type="button" style={formStyles.cancelButton} onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" style={formStyles.submitButton} disabled={loading}>
          {loading ? 'Creating…' : 'Create'}
        </button>
      </div>
    </form>
  );
}

const formStyles = {
  form: { padding: 20, marginBottom: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  row: { marginBottom: 16 },
  label: { display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6 },
  error: { marginBottom: 12, color: '#b91c1c', fontSize: 14 },
  actions: { display: 'flex', gap: 12, justifyContent: 'flex-end' },
  cancelButton: { padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: 6 },
  submitButton: { padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500 },
};
