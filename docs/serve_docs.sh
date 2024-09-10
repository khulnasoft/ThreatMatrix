#!/usr/bin/env bash
export DJANGO_SETTINGS_MODULE="threat_matrix.settings"
make html
cd build/html && python3 -m http.server 6969 && cd ../../
