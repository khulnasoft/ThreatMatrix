#!/bin/bash

until cd /opt/deploy/intel_x
do
    echo "Waiting for server volume..."
done
ARGUMENTS="-A intel_x.celery worker -n worker_long --uid www-data --gid www-data --time-limit=40000 --pidfile= -Ofair -Q long,broadcast,config -E --without-gossip"
if [[ $DEBUG == "True" ]] && [[ $DJANGO_TEST_SERVER == "True" ]];
then
    echo "Running celery with autoreload"
    python3 manage.py celery_reload -c "$ARGUMENTS"
else
  /usr/local/bin/celery $ARGUMENTS
fi