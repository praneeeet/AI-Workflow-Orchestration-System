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
          style={{
            ...formStyles.input,
            ...(loading && formStyles.inputDisabled)
          }}
          autoFocus
          disabled={loading}
        />
      </div>
      {error && (
        <div style={formStyles.error}>
          <span style={formStyles.errorIcon}>⚠</span>
          {error}
        </div>
      )}
      <div style={formStyles.actions}>
        <button 
          type="button" 
          style={{
            ...formStyles.cancelButton,
            ...(loading && formStyles.buttonDisabled)
          }}
          onClick={onCancel} 
          disabled={loading}
          onMouseEnter={(e) => !loading && Object.assign(e.target.style, formStyles.cancelButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, formStyles.cancelButton)}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          style={{
            ...formStyles.submitButton,
            ...(loading && formStyles.buttonDisabled)
          }}
          disabled={loading}
          onMouseEnter={(e) => !loading && Object.assign(e.target.style, formStyles.submitButtonHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, formStyles.submitButton)}
        >
          {loading ? 'Creating…' : 'Create'}
        </button>
      </div>
    </form>
  );
}

const formStyles = {
  form: { 
    padding: '24px', 
    marginBottom: 24, 
    background: '#ffffff', 
    borderRadius: 12, 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb'
  },
  row: { 
    marginBottom: 20 
  },
  label: { 
    display: 'block', 
    marginBottom: 8, 
    fontWeight: 600, 
    fontSize: 14,
    color: '#374151',
    letterSpacing: '-0.01em'
  },
  input: { 
    width: '100%', 
    padding: '11px 14px', 
    border: '1.5px solid #d1d5db', 
    borderRadius: 8,
    fontSize: 15,
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#ffffff'
  },
  inputDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    background: '#f9fafb'
  },
  error: { 
    marginBottom: 16, 
    padding: '10px 14px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: 8,
    color: '#991b1b', 
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  errorIcon: {
    fontSize: 16
  },
  actions: { 
    display: 'flex', 
    gap: 12, 
    justifyContent: 'flex-end',
    marginTop: 24
  },
  cancelButton: { 
    padding: '10px 20px', 
    background: '#f3f4f6', 
    border: 'none', 
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#374151',
    fontFamily: 'inherit'
  },
  cancelButtonHover: {
    background: '#e5e7eb'
  },
  submitButton: { 
    padding: '10px 24px', 
    background: '#2563eb', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: 8, 
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
  },
  submitButtonHover: {
    background: '#1d4ed8',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
};