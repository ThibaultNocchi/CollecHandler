# CollecHandler

Simple tool to make lists of items you own, such as CD, DVD, cables, pets...

## Usage

`docker run -it --name collechandler -e JWT_SECRET=YOUR_SECRET -v /YOUR/DB/DIR:/server/prisma/db -p 8080:80 ghcr.io/thibaultnocchi/collechandler:latest`

- `-e JWT_SECRET=YOUR_SECRET`: replace with a secret key to sign the JWT tokens that'll invalidate them if changed
- `-v /YOUR/DB/DIR:/server/prisma/db`: to save on the host the database
- `-p 8080:80`: expose the web interface on the port 8080 of your host
