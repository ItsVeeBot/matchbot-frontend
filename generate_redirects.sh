#!/bin/bash

echo "/socket.io/* $VITE_SERVER_URL/:splat 200" > public/_redirects
cat public/_redirects