#!/bin/bash

# Script to preview documentation locally
# Usage: ./scripts/preview-docs.sh

set -e

echo "🚀 Starting local documentation preview..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the react-native-mantine root directory"
    exit 1
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo "❌ Error: docs directory not found"
    exit 1
fi

# Navigate to docs directory
cd docs

echo "📁 Serving from: $(pwd)"
echo "🌐 Documentation will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Try to use npx serve (preferred)
if command -v npx &> /dev/null; then
    npx serve . -p 3000
# Fallback to Python 3
elif command -v python3 &> /dev/null; then
    echo "📝 Using Python 3 HTTP server as fallback"
    python3 -m http.server 3000
# Fallback to Python 2
elif command -v python &> /dev/null; then
    echo "📝 Using Python 2 HTTP server as fallback"
    python -m SimpleHTTPServer 3000
else
    echo "❌ Error: No suitable HTTP server found"
    echo "Please install Node.js (for npx) or Python"
    exit 1
fi
