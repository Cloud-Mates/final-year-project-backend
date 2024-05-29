## Deployment

git clone git@github.com:Cloud-Mates/final-year-project-backend.git                                         // clone code
cd final-year-project-backend                                                                               // enter into root dir of project
sudo docker build -t  quickube-backend .                                                                    // build docker image
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter name=quickube))                           // stop & remove existing container
sudo docker run --name quickube --restart unless-stopped -p 4000:4000 -d quickube-backend:latest            // run container
sudo docker logs $(sudo docker ps -a -q --filter name=quickube)                                             // get credentials from log
sudo head -8 $(sudo docker inspect --format='{{.LogPath}}' $(sudo docker ps -a -q --filter name=quickube))  // alternatively