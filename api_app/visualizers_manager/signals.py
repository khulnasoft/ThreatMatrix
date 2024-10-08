import logging
import uuid

from django.conf import settings
from django.dispatch import receiver

from api_app.signals import migrate_finished
from api_app.visualizers_manager.models import VisualizerConfig
from threat_matrix.celery import get_queue_name

logger = logging.getLogger(__name__)


@receiver(migrate_finished)
def post_migrate_visualizers_manager(
    sender,
    *args,
    check_unapplied: bool = False,
    **kwargs,
):
    logger.info(f"Post migrate {args} {kwargs}")
    if check_unapplied:
        return
    from threat_matrix.tasks import refresh_cache

    refresh_cache.apply_async(
        queue=get_queue_name(settings.CONFIG_QUEUE),
        MessageGroupId=str(uuid.uuid4()),
        priority=3,
        args=[VisualizerConfig.python_path],
    )
