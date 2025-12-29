#!/bin/bash
set -e
npm run build --prefix frontend
aws s3 sync frontend/public/assets s3://$S3_BUCKET/assets --acl public-read
vercel --prod frontend
