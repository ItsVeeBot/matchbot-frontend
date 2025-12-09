#!/bin/bash

echo "/socket.io/* $VITE_SERVER_URL/:splat 200" > _redirects
ls -l
cat _redirects