from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer
import json
import requests
from django.http import JsonResponse
# Create your views here.
# @api_view(['GET'])
# def say_hello(request):
#    # return HttpResponse("Hello World")
#    return Response(UserSerializer( {'name':'aliyan','age':18}).data)
def say_hello(request):
     
	
    url = "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent"

    headers = {
'X-RapidAPI-Host' :'cricbuzz-cricket.p.rapidapi.com',
'X-RapidAPI-Key': 'ee1ba10db1msh7165df9ed4f6c96p19b981jsnbe0388a7e6c4'
        # "X-RapidAPI-Key": "c8ff194be9mshc35ab32d075fb7bp17a1e7jsn2f902760e321",
        # "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        matches = []

        for match_type in data.get("typeMatches", []):
            match_category = match_type.get("matchType", "Unknown Category")  # Match type (International, League, etc.)
            
            for series in match_type.get("seriesMatches", []):
                if "seriesAdWrapper" in series:
                    series_name = series["seriesAdWrapper"]["seriesName"]

                    # Extract matches inside the series
                    for match in series["seriesAdWrapper"].get("matches", []):
                        match_info = match.get("matchInfo", {})
                        match_score = match.get("matchScore", {})

                        match_format = match_info.get("matchFormat", "Unknown Format")
                        team1_info = match_info.get("team1", {})
                        team2_info = match_info.get("team2", {})

                        team1 = team1_info.get("teamName", "Unknown Team 1")
                        team2 = team2_info.get("teamName", "Unknown Team 2")

                        status = match_info.get("status", "No Status")

                        # Extract team logos
                        team1_img_id = team1_info.get("imageId", "default_team1_logo")
                        team2_img_id = team2_info.get("imageId", "default_team2_logo")

                        team1_img_url = f"https://www.cricbuzz.com/a/img/v1/192x192/i1/c{team1_img_id}.png"
                        team2_img_url = f"https://www.cricbuzz.com/a/img/v1/192x192/i1/c{team2_img_id}.png"

                        # Extract team scores (including 2nd innings for Test matches)
                        team1_inngs1 = match_score.get("team1Score", {}).get("inngs1", {})
                        team1_inngs2 = match_score.get("team1Score", {}).get("inngs2", {}) 

                        team1_score_1 = f"{team1_inngs1.get('runs', 'N/A')}/{team1_inngs1.get('wickets', 'N/A')} ({team1_inngs1.get('overs', 'N/A')} overs)"
                        team1_score_2 = f"{team1_inngs2.get('runs', 'N/A')}/{team1_inngs2.get('wickets', 'N/A')} ({team1_inngs2.get('overs', 'N/A')} overs)" if team1_inngs2 else ""

                        team2_inngs1 = match_score.get("team2Score", {}).get("inngs1", {})
                        team2_inngs2 = match_score.get("team2Score", {}).get("inngs2", {})

                        team2_score_1 = f"{team2_inngs1.get('runs', 'N/A')}/{team2_inngs1.get('wickets', 'N/A')} ({team2_inngs1.get('overs', 'N/A')} overs)"
                        team2_score_2 = f"{team2_inngs2.get('runs', 'N/A')}/{team2_inngs2.get('wickets', 'N/A')} ({team2_inngs2.get('overs', 'N/A')} overs)" if team2_inngs2 else ""

                        # Combine scores for Test matches
                        if match_format == "TEST":
                            team1_score = f"{team1_score_1} & {team1_score_2}" if team1_score_2 else team1_score_1
                            team2_score = f"{team2_score_1} & {team2_score_2}" if team2_score_2 else team2_score_1
                        else:
                            team1_score = team1_score_1
                            team2_score = team2_score_1

                        matches.append({
                            "match_category": match_category,  # Added match type (International, League, etc.)
                            "series": series_name,
                            "match_format": match_format,
                            "team1": team1,
                            "team1_img": team1_img_url,  
                            "team1_score": team1_score,
                            "team2": team2,
                            "team2_img": team2_img_url, 
                            "team2_score": team2_score,
                            "status": status
                        })

        return JsonResponse(matches, safe=False)

    else:
       return JsonResponse({"error": "An error occurred"}, status=response.status_code)
# live | recent | upcoming url
def get_match_info(request):
    url = 'https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international' 

    headers = {
'X-RapidAPI-Host' :'cricbuzz-cricket.p.rapidapi.com',
'X-RapidAPI-Key': 'ee1ba10db1msh7165df9ed4f6c96p19b981jsnbe0388a7e6c4'
        # "X-RapidAPI-Key": "c8ff194be9mshc35ab32d075fb7bp17a1e7jsn2f902760e321",
        # "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        match_details = []
        for entry in data.get("matchScheduleMap", []):
         if "scheduleAdWrapper" in entry:
            date = entry["scheduleAdWrapper"].get("date", "Unknown Date")
            for series in entry["scheduleAdWrapper"].get("matchScheduleList", []):
                series_name = series.get("seriesName", "Unknown Series")
                for match in series.get("matchInfo", []):
                    match_info = {
                        "date": date,
                        "series": series_name,
                        "match_desc": match.get("matchDesc", ""),
                        "format": match.get("matchFormat", ""),
                        "team1": match["team1"].get("teamName", "Unknown Team"),
                        "team2": match["team2"].get("teamName", "Unknown Team"),
                        "venue": match["venueInfo"].get("ground", "Unknown Venue"),
                        "city": match["venueInfo"].get("city", "Unknown City"),
                        "country": match["venueInfo"].get("country", "Unknown Country"),
                    }
                    match_details.append(match_info)
        return JsonResponse(match_details,safe=False)
    else:
        return JsonResponse({'error':'an error occured'},status=response.status_code)