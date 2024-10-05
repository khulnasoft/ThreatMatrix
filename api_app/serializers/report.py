from rest_framework import serializers as rfs

from api_app.models import AbstractReport
from api_app.serializers import AbstractBIInterface


class AbstractReportSerializerInterface(rfs.ModelSerializer):
    name = rfs.SlugRelatedField(read_only=True, source="config", slug_field="name")
    type = rfs.SerializerMethodField(read_only=True, method_name="get_type")

    class Meta:
        fields = ["name", "process_time", "status", "end_time", "parameters", "type"]
        list_serializer_class = rfs.ListSerializer

    @staticmethod
    def get_type(instance: AbstractReport):
        return instance.__class__.__name__.replace("Report", "").lower()

    def to_internal_value(self, data):
        # existing implementation


class AbstractReportBISerializer(AbstractBIInterface):
    timestamp = rfs.DateTimeField(source="start_time")
    username = rfs.CharField(source="job.user.username")
    name = rfs.SlugRelatedField(read_only=True, source="config", slug_field="name")
    job_id = rfs.CharField(source="job.pk")

    class Meta:
        fields = AbstractBIInterface.Meta.fields + [
            "name",
            "parameters",
        ]
        list_serializer_class = rfs.ListSerializer

    # Remove the method if it's not needed, or add specific logic if required

    def get_class_instance(self, instance: AbstractReport):
        return super().get_class_instance(instance).split("report")[0]


class AbstractReportSerializer(AbstractReportSerializerInterface):
    class Meta:
        fields = AbstractReportSerializerInterface.Meta.fields + [
            "id",
            "report",
            "errors",
            "start_time",
        ]
        list_serializer_class = (
            AbstractReportSerializerInterface.Meta.list_serializer_class
        )
