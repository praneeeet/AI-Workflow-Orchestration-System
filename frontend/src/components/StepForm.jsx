import { useState } from 'react';
import { createStep } from '../services/api';

const MODELS = ['kimi-k2p5', 'kimi-k2-instruct-0905'];
const CRITERIA_TYPES = ['CONTAINS', 'REGEX', 'JSON_VALID'];

export default function StepForm({ workflowId, onSuccess, onCancel }) {
  const [order, setOrder] = useState(0);
  const [model, setModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState('');
  const [criteriaType, setCriteriaType] = useState(CRITERIA_TYPES[0]);
  const [criteriaValue, setCriteriaValue] = useState('');
  const [retryLimit, setRetryLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!prompt.trim()) {
      setError('Prompt is required');
      return;
    }
    setLoading(true);
    try {
      await createStep(workflowId, {
        order: Number(order),
        model,
        prompt: prompt.trim(),
        criteriaType,
        criteriaValue: criteriaValue.trim() || undefined,
        retryLimit: Number(retryLimit),
      });
      onSuccess?.();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to add step';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6 };
  const textareaStyle = { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 6, resize: 'vertical' };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, marginBottom: 24, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Order</label>
          <input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} style={inputStyle} disabled={loading} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={inputStyle} disabled={loading}>
            {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Prompt</label>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Use {{previousOutput}} for previous step" rows={4} style={textareaStyle} disabled={loading} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Criteria type</label>
          <select value={criteriaType} onChange={(e) => setCriteriaType(e.target.value)} style={inputStyle} disabled={loading}>
            {CRITERIA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Criteria value</label>
          <input type="text" value={criteriaValue} onChange={(e) => setCriteriaValue(e.target.value)} placeholder="Optional for JSON_VALID" style={inputStyle} disabled={loading} />
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Retry limit</label>
        <input type="number" min={0} value={retryLimit} onChange={(e) => setRetryLimit(e.target.value)} style={inputStyle} disabled={loading} />
      </div>
      {error && <div style={{ marginBottom: 12, color: '#b91c1c', fontSize: 14 }}>{error}</div>}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" style={{ padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: 6 }} onClick={onCancel} disabled={loading}>Cancel</button>
        <button type="submit" style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500 }} disabled={loading}>{loading ? 'Adding…' : 'Add step'}</button>
      </div>
    </form>
  );
}
