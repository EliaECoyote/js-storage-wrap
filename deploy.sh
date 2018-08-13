#!/bin/bash
yarn test --coverage && cat ./coverage/lcov.info | yarn coveralls && rm -rf ./coverage
npm whoami
npm publish
