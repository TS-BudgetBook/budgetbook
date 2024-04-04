#!/bin/bash

if git log -1 --pretty=%B | grep -q 'RELEASE_TYPE: major'; then
  echo "Performing a major release"
  standard-version --release-as major
elif git log -1 --pretty=%B | grep -q 'RELEASE_TYPE: minor'; then
  echo "Performing a minor release"
  standard-version --release-as minor
elif git log -1 --pretty=%B | grep -q 'RELEASE_TYPE: patch'; then
  echo "Performing a patch release"
  standard-version --release-as patch
else
  echo "No specific release type specified. Performing a standard release."
  standard-version
fi