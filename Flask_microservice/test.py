from model_utils import compute_scores

# 2 Candidates
candidates = [
    {
        "candidateId": "CAND1",
        "skills": ["Python", "SQL", "Machine Learning","scikit-learn"],  # only required skills
        "degree": "B.Tech",
        "major": "CS",
        "preferredLocations": ["Bhopal"],
        "pastParticipationCount": 0
    },
    {
        "candidateId": "CAND2",
        "skills": ["Python", "SQL", "Machine Learning", "Typing"],  # Typing unrelated
        "degree": "B.Tech",
        "major": "CS",
        "preferredLocations": ["Bhopal"],
        "pastParticipationCount": 0
    }
]

# 1 Internship
internships = [
    {
        "internshipId": "INT1",
        "requiredSkills": ["Python", "SQL", "Machine Learning"],
        "sector": "AI",
        "locationDistrict": "Bhopal",
        "minDegree": "B.Tech"
    }
]

# Compute scores
scores = compute_scores(candidates, internships)

# Display
for i, c in enumerate(candidates):
    print(f"Candidate {c['candidateId']} score for {internships[0]['internshipId']}: {scores[i,0]:.4f}")
