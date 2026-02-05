Agentic Workflow Builder

A full-stack AI orchestration platform that allows users to design, execute, and monitor multi-step AI workflows using LLMs.

Overview

The Agentic Workflow Builder enables users to create workflows consisting of multiple AI tasks (steps). Each step:

Uses an LLM model

Executes a custom prompt

Validates output using completion criteria

Passes context to the next step automatically

Supports retry handling and execution tracking

This system automates chaining AI agents and provides observability, reliability, and execution monitoring.

Features
Workflow Builder

Create multi-step AI workflows

Configure prompts, models, and validation rules

Save and manage workflows

LLM Integration

Integrated with Unbound AI API

Supports multiple models:

kimi-k2p5

kimi-k2-instruct-0905

Sequential AI Execution

Step-by-step execution pipeline

Automatic context passing between steps

Retry mechanism for failed steps

Execution Monitoring

Track workflow progress in real-time

View step-level outputs

Observe retry attempts and failures

Architecture
Frontend (React + Vite)
│
▼
Backend (NestJS + TypeORM)
│
▼
Database (PostgreSQL / SQLite)
│
▼
Unbound LLM API

Tech Stack
Frontend

React

Vite

Axios

React Router

Backend

NestJS

TypeORM

REST API

Express

AI Integration

Unbound API

Database

PostgreSQL (Primary)

SQLite (Fallback for rapid deployment)

📂 Project Structure
backend/
├── src/
│ ├── workflow/
│ ├── step/
│ ├── execution/
│ ├── llm/
│ ├── criteria/
│ └── common/

frontend/
├── components/
├── pages/
├── services/
└── routes/
