# This file is a part of ThreatMatrix https://github.com/khulnasoft/ThreatMatrix
# See the file 'LICENSE' for copying permission.

# flake8: noqa E501

from .commons import BASE_STATIC_PATH, DEBUG

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # whitenoise
    "certego_saas.ext.middlewares.StatsMiddleware",  # custom
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "certego_saas.ext.middlewares.LogMiddleware",  # custom
]

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = 60 * 60 * 24 * 14  # seconds * minutes * hours * days

if DEBUG:
    MIDDLEWARE.append("silk.middleware.SilkyMiddleware")

ROOT_URLCONF = "threat_matrix.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            str(BASE_STATIC_PATH.joinpath("reactapp")),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "certego_saas.templates.context_processors.host",  # custom
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "threat_matrix.wsgi.application"

# Internationalization

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True
