xapi sample application
=======================

This example uses the OpenLayers-Library to test xapi implementations.

Requirements
============

You need to have an xapi server on this server at `/api`

Proxy a xapi instance with nginx
--------------------------------

    server {
      listen          80;
      server_name     $SERVER_NAME;
      root            $WEB_ROOT;

      location /api {
        proxy_pass http://open.mapquestapi.com/xapi/api;
      }
    }
