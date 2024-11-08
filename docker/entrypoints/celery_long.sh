#!/bin/bash

until cd /opt/deploy/threat_matrix
do
    echo "Waiting for server volume..."
done
if [ "$AWS_SQS" = "True" ]
then
  queues="long.fifo,config.fifo"
else
  queues="long,broadcast,config"
fi

ARGUMENTS="-A threat_matrix.celery worker -n worker_long --uid www-data --gid www-data --time-limit=40000 --pidfile= -Ofair -Q ${queues} -E --without-gossip"
if [[ $DEBUG == "True" ]] && [[ $DJANGO_TEST_SERVER == "True" ]];
then
    echo "Running celery with autoreload"
    python3 manage.py celery_reload -c "$ARGUMENTS"
else
  /usr/local/bin/celery $ARGUMENTS
fi