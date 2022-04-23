from django.urls import path

from .views import MyTokenObtainPairView, AgentTable, AdminTable, UpdateAgent, UpdateAdmin, ArchiveUser, ChangePassword, \
    EditAgent, CodeAuthView, statistique, newsletterView, websiteView, deleteNewsletter, archivWebsite, DataScraperView, \
    logdatascraperView, missionView, credentialView, updateCredentials, archivCredential

from rest_framework_simplejwt.views import TokenRefreshView





urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # get token and login
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh token
    path('agent/', AgentTable.as_view()), # view and add agent
    path('admin/', AdminTable.as_view()), # view and add admin
    path('codeauth/<int:pk>', CodeAuthView.as_view()), # Two Factor Auth
    path('updateagent/<int:pk>', UpdateAgent.as_view()),# update profile agent
    path('updateadmin/<int:pk>', UpdateAdmin.as_view()),# update profile admin
    path('archiveuser/<int:pk>', ArchiveUser.as_view()), # archive user
    path('editagent/<int:pk>', EditAgent.as_view()), # update agent
    path('lostpassword/', ChangePassword.as_view()), # change password by agent



    path('statistique/', statistique.as_view()), # view statistique by admin
    path('newsletter/', newsletterView.as_view()), # view and add newsletter
    path('deletenewsletter/', deleteNewsletter.as_view()), # delete newsletter
    path('website/', websiteView.as_view()), # view and add website for scraping
    path('archivewebsite/', archivWebsite.as_view()), # archive website for scraping
    path('datascraper/', DataScraperView.as_view()), # view data scraper
    path('logscraper/', logdatascraperView.as_view()), # view log scraper n8n
    path('mission/', missionView.as_view()), # view and add mission
    path('credential/', credentialView.as_view()), # view and add credential
    path('updatecredential/', updateCredentials.as_view()), # update credential
    path('archivecredential/', archivCredential.as_view()), # archive credential
]