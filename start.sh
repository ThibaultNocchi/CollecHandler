#!/bin/sh

cd /server
npx prisma migrate deploy

cd /
supervisord -c supervisord.conf
