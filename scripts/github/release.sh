-#!/bin/bash

# Publish Steps
#
# The following steps describe the release process
# for the app to GitHub Releases. We assume that
# steps 1, 2 and 3 are done by the time this script runs.
#
# 1. Make Changes
# 2. Git Commit Changes
# 3. Test Changes
# 4. Bump Version in `package.json`
# 5. Generate Changelog
# 6. Commit `package.json` and `CHANGELOG.md` files
# 7. Git Tag
# 8. Git Push
# 9. Git Release through API

# Get Branch
GIT_BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"

# Test Branch
if [[ "$GIT_BRANCH_NAME" != "master" ]]; then printf "\nError: GitHub Releases may only be made from the 'master' branch. You are on branch '${GIT_BRANCH_NAME}'.\n\n" && exit 1; fi

# Get Arguments
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -rv|--release-version)
    VERSION="$2"
    shift
    ;;
esac
shift
done

# Tets Version
if [[ ! ${VERSION} ]]; then printf "\nError: Version not set.\nSet a version by passing the '--release-version' (-rv) argument.\n\n" && exit 1; fi

NPM_VERSION_CMD="npm version ${VERSION} --no-git-tag-version"
PRERELEASE=false

if [[ $VERSION == "prerelease" ]]; then PRERELEASE=true; fi

# Step 4 - Bump Version in `package.json`
eval "${NPM_VERSION_CMD}"

# Step 5 - Generate Changelog
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

# Step 6 - Commit `package.json` and `CHANGELOG.md` files
eval "git commit -m \"Release ${PACKAGE_VERSION}\""

# Step 7 - Git Tag
eval "git tag ${PACKAGE_VERSION}"

# Step 8 - Git Push
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
CMD="${CMD} --data '{ \"tag_name\": \"${PACKAGE_VERSION}\", \"target_commitish\": \"master\", \"name\": \"${PACKAGE_VERSION}\", \"body\": \"Release ${PACKAGE_VERSION}\", \"draft\": false, \"prerelease\": ${PRERELEASE} }'"
CMD="${CMD} https://api.github.com/repos/${USER}/${REPO}/releases"

# Step 9 - Git Release through API
eval "${CMD}"
