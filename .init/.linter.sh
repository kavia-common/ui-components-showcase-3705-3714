#!/bin/bash
cd /home/kavia/workspace/code-generation/templates_demo-ui-components-showcase-3705-3714-3745/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

