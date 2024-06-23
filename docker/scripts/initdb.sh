docker exec intelx_uwsgi python3 manage.py makemigrations
docker exec intelx_uwsgi python3 manage.py migrate
docker exec -ti intelx_uwsgi python3 manage.py createsuperuser \
--username admin --email admin@admin.com --first_name admin --last_name admin
