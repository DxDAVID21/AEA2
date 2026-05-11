#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push --accept-data-loss

echo "Starting FinançaFlow..."
exec "$@"