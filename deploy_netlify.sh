#!/bin/bash
set -e
echo "Building frontend..."
npm run build --prefix frontend
echo "Syncing assets to S3..."
aws s3 sync frontend/public/assets s3://$S3_BUCKET/assets --acl public-read
echo "Deploying to Netlify..."
netlify deploy --prod --dir=frontend/dist || netlify deploy --prod --dir=frontend/build
