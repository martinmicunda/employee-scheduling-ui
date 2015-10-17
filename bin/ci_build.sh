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

function deploy {
    echo "-- Build production app code"
    npm run build -- --env=TEST --optimize=true --ghpages

    # Publish to GitHub gh-pages branch
    npm run deploy
}

function run {

    init

    # Install NPM ad JSPM packages
    npm install

    if [[ "$PULL_REQUEST" != "false" ]]; then
        echo "-- Running unit tests"
        npm test -- --browsers=Firefox

        #echo "-- Running e2e tests "
        #gulp test:e2e --browsers=Firefox

        echo "-- This is a pull request build; will not push build out."
        exit 0
    else
        echo "-- Running unit tests and pushing coverage report to coveralls"
        npm test -- --browsers=Firefox --coveralls

        #echo "-- Running e2e tests "
        #gulp test:e2e --browsers=Firefox
    fi

    mkdir -p ../.tmp
    git show $COMMIT~1:../package.json > ../.tmp/package.old.json
    OLD_VERSION=$(readJsonProp "../.tmp/package.old.json" "version")
    VERSION=$(readJsonProp "../package.json" "version")

    if [[ "$OLD_VERSION" != "$VERSION" ]]; then
        echo "#########################"
        echo "# Releasing v$VERSION! #"
        echo "#########################"

        deploy

#        TAG_NAME="v$VERSION"
#
#        # Create and push the tag to Github
#        git tag "$TAG_NAME" -m "chore(release): $TAG_NAME"
#        git push origin $TAG_NAME

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

        NEW_VERSION="$VERSION-build.$COMMIT"

        replaceJsonProp "../package.json" "version" "$NEW_VERSION"
        echo "-- Build version is $NEW_VERSION"

        # Load version to make sure package.json was updated correctly
        VERSION=$(readJsonProp "../package.json" "version")

        if [[ "$NEW_VERSION" != "$VERSION" ]]; then
            echo "-- The package.json was not updated correctly. The package.json version should be $NEW_VERSION but is $VERSION! Aborting build."
            exit 1
        fi

        deploy

        echo "#############################################"
        echo "# Complete! Prerelease v$VERSION published! #"
        echo "#############################################"
    fi

}

source $(dirname $0)/utils.inc
