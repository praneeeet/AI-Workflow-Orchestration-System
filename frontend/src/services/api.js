import axios from 'axios';

const api = axios.create({
  baseURL: 'https://glauconitic-indefinite-ayleen.ngrok-free.dev',
  headers: { 'Content-Type': 'application/json' },
});

export function createWorkflow(name) {
  return api.post('/workflows', { name }).then((res) => res.data);
}

export function getWorkflows() {
  return api.get('/workflows').then((res) => res.data);
}

export function getWorkflowById(id) {
  return api.get(`/workflows/${id}`).then((res) => res.data);
}

export function deleteWorkflow(id) {
  return api.delete(`/workflows/${id}`).then((res) => res.data);
}

export function createStep(workflowId, stepData) {
  return api.post(`/workflows/${workflowId}/steps`, stepData).then((res) => res.data);
}

export function getSteps(workflowId) {
  return api.get(`/workflows/${workflowId}/steps`).then((res) => res.data);
}

export function runWorkflow(workflowId) {
  return api.post(`/workflow/run/${workflowId}`).then((res) => res.data);
}

export function getExecutionResult(runId) {
  return api.get(`/execution/${runId}`).then((res) => res.data);
}
