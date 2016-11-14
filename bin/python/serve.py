#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer
from os import curdir, sep

class myHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        f = open(curdir + sep + self.path)

        self.send_response(200)
        self.send_header("Cache-Control", "private, max-age=0, no-cache")
        self.end_headers()
        self.wfile.write(bytes(f.read(), "utf8"))
        f.close()

try:
    print("starting server...")
    server_address=("127.0.0.1", 8000)
    httpd = HTTPServer(server_address, myHTTPRequestHandler)
    print("running server")
    httpd.serve_forever()
except KeyboardInterrupt:
    print("shutting down the web server")
    httpd.socket.close()
