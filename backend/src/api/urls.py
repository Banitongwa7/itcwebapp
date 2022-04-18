from django.urls import path
from .views import MyTokenObtainPairView, AgentTable, AdminTable, UpdateAgent, UpdateAdmin, ArchiveUser, ChangePassword, EditAgent

from rest_framework_simplejwt.views import TokenRefreshView





urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('agent/', AgentTable.as_view()),
    path('admin/', AdminTable.as_view()),
    path('updateagent/<int:pk>', UpdateAgent.as_view()),
    path('updateadmin/<int:pk>', UpdateAdmin.as_view()),
    path('archiveuser/<int:pk>', ArchiveUser.as_view()),
    path('editagent/<int:pk>', EditAgent.as_view()),
    path('lostpassword/', ChangePassword.as_view()),
]