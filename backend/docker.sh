#!/bin/bash

# Available commands/options:
#
# ./docker.sh shell
#     - opens a new shell for the running container
#
# ./docker.sh stop
#     - stop all running a docker containers
#     - does not stop the postgres container
#
# ./docker.sh clean
#     - stop all running a docker containers and remove them
#     - does not stop the postgres container
#
# ./docker.sh
#     - run the application

DOCKER_NAME=skill-test-container

if [[ ${1} == "clean" ]]; then
  docker stop $(docker ps -a --filter name=${DOCKER_NAME} -q)
  docker rm $(docker ps --filter name=${DOCKER_NAME} -q --filter status=exited)
elif [[ ${1} == "stop" ]]; then
  docker stop $(docker ps -a --filter name=${DOCKER_NAME} -q)
elif [[ ${1} == "shell" ]]; then
  docker exec -it $(docker ps --filter name=${DOCKER_NAME} -q) \
    bash -c 'cd /app && /bin/bash'
else
  if [ "$(docker ps -aq -f name=^/${DOCKER_NAME}$)" ]; then
    echo "Removing existing container: $DOCKER_NAME"
    docker rm -f $DOCKER_NAME
  else
    echo "No exited containers found for name: ${DOCKER_NAME}"
  fi
  docker-compose -f docker-compose.yml run --service-ports --name ${DOCKER_NAME} app bash
fi