docker exec intelx_uwsgi ls -al /var/log/intel_x/$1
docker exec -ti intelx_uwsgi tail -f /var/log/intel_x/$1