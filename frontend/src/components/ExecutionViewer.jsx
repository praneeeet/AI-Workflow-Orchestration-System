export default function ExecutionViewer({ run, loading, error }) {
  if (loading) return <p style={s.muted}>Loading execution…</p>;
  if (error) return <div style={s.error}>{error}</div>;
  if (!run) return null;

  const stepExecutions = run.stepExecutions ?? [];

  const statusColor =
    run.status === 'SUCCESS'
      ? '#059669'
      : run.status === 'FAILED'
      ? '#b91c1c'
      : '#6b7280';

  return (
    <div style={s.wrap}>
      {/* RUN HEADER */}
      <div style={s.header}>
        <span style={s.runId}>Run {run.id?.slice(0, 8)}…</span>

        <span style={{ ...s.status, color: statusColor }}>
          {run.status}
        </span>

        <span style={s.meta}>
          Current Step: {run.currentStepIndex ?? 0}
        </span>
      </div>

      {/* WORKFLOW NAME */}
      {run.workflow && (
        <p style={s.workflow}>
          Workflow: <strong>{run.workflow.name}</strong>
        </p>
      )}

      <h3 style={s.subtitle}>Step Executions</h3>

      {stepExecutions.length === 0 ? (
        <p style={s.muted}>No step executions recorded.</p>
      ) : (
        <ol style={s.list}>
          {stepExecutions.map((se, i) => (
            <li key={se.id} style={s.item}>
              {/* STEP HEADER */}
              <div style={s.stepHeader}>
                <span style={s.stepOrder}>Step {i + 1}</span>

                <span
                  style={{
                    ...s.stepStatus,
                    color:
                      se.status === 'SUCCESS'
                        ? '#059669'
                        : '#b91c1c',
                  }}
                >
                  {se.status}
                </span>

                {se.step && (
                  <span style={s.stepModel}>
                    Model: {se.step.model}
                  </span>
                )}

                <span style={s.attempts}>
                  Attempts: {se.attemptCount ?? 0}
                </span>
              </div>

              {/* FAILURE REASON */}
              {se.failureReason && (
                <div style={s.warningBox}>
                  ⚠️ {se.failureReason}
                </div>
              )}

              {/* ERROR MESSAGE */}
              {se.errorMessage && (
                <div style={s.errorBox}>
                  ❌ {se.errorMessage}
                </div>
              )}

              {/* OUTPUT */}
              {se.output != null && se.output !== '' && (
                <pre style={s.output}>{se.output}</pre>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const s = {
  wrap: {
    padding: 20,
    background: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    marginTop: 16,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    flexWrap: 'wrap',
  },

  runId: {
    fontFamily: 'monospace',
    fontSize: 14,
  },

  status: {
    fontWeight: 600,
    fontSize: 14,
  },

  meta: {
    fontSize: 14,
    color: '#6b7280',
  },

  workflow: {
    margin: '0 0 16px',
    fontSize: 14,
    color: '#374151',
  },

  subtitle: {
    margin: '0 0 12px',
    fontSize: 16,
    fontWeight: 600,
  },

  list: {
    margin: 0,
    paddingLeft: 20,
  },

  item: {
    marginBottom: 18,
    paddingBottom: 18,
    borderBottom: '1px solid #e5e7eb',
  },

  stepHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 8,
  },

  stepOrder: {
    fontWeight: 600,
  },

  stepStatus: {
    fontSize: 14,
    fontWeight: 500,
  },

  stepModel: {
    fontSize: 13,
    color: '#6b7280',
  },

  attempts: {
    fontSize: 13,
    color: '#6b7280',
  },

  output: {
    margin: 0,
    padding: 12,
    background: '#f9fafb',
    borderRadius: 6,
    fontSize: 13,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: 200,
    overflow: 'auto',
  },

  muted: {
    color: '#6b7280',
    margin: '16px 0',
  },

  error: {
    padding: 12,
    background: '#fef2f2',
    color: '#b91c1c',
    borderRadius: 8,
  },

  warningBox: {
    background: '#fff7ed',
    color: '#c2410c',
    padding: 10,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 8,
  },

  errorBox: {
    background: '#fef2f2',
    color: '#b91c1c',
    padding: 10,
    borderRadius: 6,
    fontSize: 13,
    marginBottom: 8,
  },
};
