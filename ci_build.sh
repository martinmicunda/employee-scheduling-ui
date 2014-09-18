#!/bin/bash

echo "#################################"
echo "####      CI Build     ##########"
echo "#################################"

# Enable tracing and exit on first failure
set -e

ARG_DEFS=(
)

function init {
    # If we are on Travis CI, set our git credentials to make the travis commits look better
    if [[ "$TRAVIS" == "true" ]]; then
        git config --global user.name 'Travis-CI'
        git config --global user.email "travis@travis-ci.org"
        BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
        PULL_REQUEST=$TRAVIS_PULL_REQUEST
        COMMIT=$TRAVIS_COMMIT
        BRANCH=$TRAVIS_BRANCH
    elif [[ -n "$JENKINS_HOME" ]]; then
        echo "JENKINS"
        BUILD_NUMBER=$BUILD_NUMBER
        PULL_REQUEST=false
        COMMIT=$GIT_COMMIT
        BRANCH=$GIT_BRANCH
    else
        # For testing if we aren't on CI
        BUILD_NUMBER=$RANDOM
        PULL_REQUEST=false
        COMMIT=$(git rev-parse HEAD)
        BRANCH=origin/master
    fi

    echo "BRANCH=$BRANCH"
    echo "BUILD_NUMBER=$BUILD_NUMBER"
    echo "PULL_REQUEST=$PULL_REQUEST"
    echo "COMMIT=$COMMIT"
}

function cleanGhPagesBranch {
    git clone --quiet --branch=gh-pages https://$GH_TOKEN@github.com/martinmicunda/employee-scheduling.git gh-pages/
    cd gh-pages
    git rm -rf .
    git add -f .
    git commit -m "$1"
    git push -f origin gh-pages > /dev/null
    cd ../
    rm -rf gh-pages
}

function deployToHeroku {
    # Install Heroku CLI
    wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
    git remote add heroku git@heroku.com:employee-scheduling.git

    # Turn off warnings about SSH keys
    echo "Host heroku.com" >> ~/.ssh/config
    echo "   StrictHostKeyChecking no" >> ~/.ssh/config
    echo "   CheckHostIP no" >> ~/.ssh/config
    echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

    # Clear Heroku SSH keys
#    heroku keys:remove ~/.ssh/config
   heroku keys:clear
#    heroku keys:remove travis-${TRAVIS_JOB_ID}@example.com

    # Add a new SSH key to Heroku
    yes | heroku keys:add

    # Push latest build/dist to heroku
    heroku git:clone -a employee-scheduling heroku/
    cd heroku
    git rm -rf .
    cp -R ../build/dist/* .
    git add -A .
    git commit -m "$1"
    git push -f heroku master
    cd ../
    rm -rf heroku
}

function run {

    init

    # Install NPM packages
    npm install

    echo "-- Build production app code"
    gulp build --notest --nocdn

    echo "-- Running unit tests "
    gulp test:unit
#    gulp test:e2e --browsers=Firefox

    if [[ "$PULL_REQUEST" != "false" ]]; then
        echo "-- This is a pull request build; will not push build out."
        exit 0
    fi

    mkdir -p .tmp
    git show $COMMIT~1:package.json > .tmp/package.old.json
    OLD_VERSION=$(readJsonProp ".tmp/package.old.json" "version")
    VERSION=$(readJsonProp "package.json" "version")

    if [[ "$OLD_VERSION" != "$VERSION" ]]; then
        echo "#########################"
        echo "# Releasing v$VERSION! #"
        echo "#########################"

        TAG_NAME="v$VERSION"

        # Remove old artifacts from gh-pages branch
        cleanGhPagesBranch "Remove old artifacts and preparing branch for release v$TAG_NAME"

        # Create and push the tag to Github
        git tag "$TAG_NAME" -m "chore(release): $TAG_NAME"
        git push origin $TAG_NAME

        # Publish to GitHub gs-pages branch
        gulp gh-pages

        deployToHeroku "Deploy release v$TAG_NAME"

        echo "##########################################"
        echo "# Complete! Release v$VERSION published! #"
        echo "##########################################"
    else
        if [[ "$BRANCH" != "master" ]]; then
            echo "-- We are not on branch master, instead we are on branch $BRANCH. Aborting build."
            exit 0
        fi

        echo "######################################"
        echo "# Pushing out a new prerelease build #"
        echo "######################################"

        NEW_VERSION="$VERSION-build.$BUILD_NUMBER"

        # Remove old artifacts from gh-pages branch
        cleanGhPagesBranch "Remove old artifacts and preparing branch for prerelease v$NEW_VERSION"

        replaceJsonProp "build/dist/package.json" "version" "$NEW_VERSION"
        echo "-- Build version is $NEW_VERSION"

        # Load version to make sure package.json was updated correctly
        VERSION=$(readJsonProp "build/dist/package.json" "version")

        if [[ "$NEW_VERSION" != "$VERSION" ]]; then
            echo "-- The package.json was not updated correctly. The package.json version should be $NEW_VERSION but is $VERSION! Aborting build."
            exit 1
        fi

        # Publish to GitHub gs-pages branch
        gulp gh-pages

        deployToHeroku "Deploy prerelease v$NEW_VERSION"

        echo "#############################################"
        echo "# Complete! Prerelease v$VERSION published! #"
        echo "#############################################"
    fi

}

source $(dirname $0)/utils.inc