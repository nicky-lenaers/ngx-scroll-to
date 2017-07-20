#!/bin/bash

# Get Arguments
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -u|--user)
    USER="$2"
    shift
    ;;
    -r|--repo)
    REPO="$2"
    shift
    ;;
    -t|--tag)
    TAG="$2"
    shift
    ;;
esac
shift
done

# Test Arguments
if [[ ! ${USER} ]]; then printf "\nError: User not set.\nSet a user by passing the '--user' (-u) argument" && exit 0; fi
if [[ ! ${REPO} ]]; then printf "\nError: Repo not set.\nSet a repo by passing the '--repo' (-r) argument" && exit 0; fi
if [[ ! ${TAG} ]]; then printf "\nError: Tag not set.\nSet a tag by passing the '-tag' (-t) argument" && exit 0; fi

# Build Command
CMD="curl -H \"Content-Type: application/json\" -u \"${USER}\" -X POST"
CMD="${CMD} --data '{ \"tag_name\": \"${TAG}\", \"target_commitish\": \"master\", \"name\": \"${TAG}\", \"body\": \"Release ${TAG}\", \"draft\": false, \"prerelease\": false }'"
CMD="${CMD} https://api.github.com/repos/${USER}/${REPO}/releases"

# Execute Command
eval ${CMD}
