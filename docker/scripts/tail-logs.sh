docker exec intelx_uwsgi ls -al /var/log/intelx/$1
docker exec -ti intelx_uwsgi tail -f /var/log/intelx/$1