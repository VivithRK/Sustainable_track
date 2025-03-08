from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Action
from .serializers import ActionSerializer
import logging

logger = logging.getLogger(__name__)

class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error in list view: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def destroy(self, request, pk=None, *args, **kwargs):
        try:
            # Get the instance or return 404
            instance = get_object_or_404(Action, pk=pk)
            
            # Log the deletion attempt
            logger.info(f"Attempting to delete action with id: {pk}")
            
            # Perform the deletion
            instance.delete()
            
            # Log successful deletion
            logger.info(f"Successfully deleted action with id: {pk}")
            
            return Response(
                {"message": f"Action with id {pk} deleted successfully"},
                status=status.HTTP_200_OK
            )
        except Action.DoesNotExist:
            logger.warning(f"Attempted to delete non-existent action with id: {pk}")
            return Response(
                {"error": f"Action with id {pk} not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error deleting action with id {pk}: {str(e)}")
            return Response(
                {"error": f"Error deleting action: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

