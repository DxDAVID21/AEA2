#!/bin/bash
set -e

# Pull the model if not already present
ollama pull llama3.2:1b || true

# Start ollama server
exec ollama serve
