export default function StepList({ steps, loading }) {
  if (loading) return <p style={{ color: '#6b7280', margin: '16px 0' }}>Loading steps…</p>;
  if (!steps || steps.length === 0) return <p style={{ color: '#6b7280', margin: '16px 0' }}>No steps yet. Add a step to run this workflow.</p>;

  const listStyle = { listStyle: 'none', padding: 0, margin: 0 };
  const itemStyle = { display: 'flex', gap: 16, padding: 16, marginBottom: 8, background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' };
  const orderStyle = { flexShrink: 0, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e5e7eb', borderRadius: 8, fontWeight: 600, fontSize: 14 };

  return (
    <ul style={listStyle}>
      {steps.map((step) => (
        <li key={step.id} style={itemStyle}>
          <span style={orderStyle}>{step.order}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{step.model}</span>
            <p style={{ margin: '6px 0', fontSize: 14, color: '#4b5563', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {step.prompt && step.prompt.length > 120 ? step.prompt.slice(0, 120) + '…' : step.prompt}
            </p>
            <span style={{ fontSize: 12, color: '#6b7280' }}>
              Criteria: {step.criteriaType}
              {step.criteriaValue != null && step.criteriaValue !== '' ? ` (${step.criteriaValue})` : ''} · Retries: {step.retryLimit}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
