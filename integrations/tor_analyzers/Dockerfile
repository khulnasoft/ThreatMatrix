FROM python:3.8-slim

ENV PROJECT_PATH /opt/deploy
ENV LOG_PATH /var/log/threat_matrix/tor_analyzers
ENV USER tor-user

# Add a new low-privileged user and update & install packages
RUN useradd -r -s /sbin/nologin ${USER} \
    && DEBIAN_FRONTEND=noninteractive apt-get update -qq \
    && apt-get install --no-install-recommends -y \
        git \
        build-essential \
        gcc \
        pandoc \
        curl \
        tor \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p ${PROJECT_PATH}/input \
    && chown -R ${USER}:${USER} ${PROJECT_PATH}/input

# Cleanup unnecessary packages and files
RUN apt-get remove --purge -y git gcc \
    && apt-get clean \
    && apt-get autoclean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /usr/share/doc/* /usr/share/man/*

# Set working directory for Flask app
WORKDIR ${PROJECT_PATH}/tor-flask
COPY app.py requirements.txt entrypoint.sh ./

RUN pip install -r requirements.txt --no-cache-dir \
    && chown -R ${USER}:${USER} . \
    && chmod +x entrypoint.sh

# Copy and set permissions for bundled tools
COPY bundled bundled
RUN chmod -R 755 bundled

# Serve Flask application using gunicorn
EXPOSE 4001
ENTRYPOINT ["./entrypoint.sh"]
