#!/bin/bash

# Get Arguments
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -pv|--publish-version)
    VERSION="$2"
    shift
    ;;
esac
shift
done

if [[ ! ${VERSION} ]]; then printf "\nError: Version not set.\nSet a version by passing the '-publish-version' (-pv) argument" && exit 1; fi

NPM_VERSION_CMD="npm version ${VERSION} --no-git-tag-version"

# Bump Root
eval "${NPM_VERSION_CMD}"

# Bump Source
(cd ./src; eval "${NPM_VERSION_CMD}")

# Changelog
npm run changelog

# Current Version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Add
git add .

# Commit
eval "git commit -m \"Release ${PACKAGE_VERSION}\""

# Tag
eval "git tag ${PACKAGE_VERSION}"

# Push
git push
git push --tags

# Get Repo Name
REPO=$(git config --local remote.origin.url|sed -n 's#.*/\([^.]*\)\.git#\1#p')

# Get Remote URL
REMOTE_URL=$(git config --get remote.origin.url)

# Get User
PARSED_REMOTE_URL=${REMOTE_URL%/*}
PARSED_REMOTE_URL=${PARSED_REMOTE_URL##*/}
USER=$(printf '%s\n' "$PARSED_REMOTE_URL")

# Build Release Command
CMD="curl -H \"Content-Type: application/json\" -u \"${USER}\" -X POST"
CMD="${CMD} --data '{ \"tag_name\": \"${PACKAGE_VERSION}\", \"target_commitish\": \"master\", \"name\": \"${PACKAGE_VERSION}\", \"body\": \"Release ${PACKAGE_VERSION}\", \"draft\": false, \"prerelease\": false }'"
CMD="${CMD} https://api.github.com/repos/${USER}/${REPO}/releases"

eval "${CMD}"
