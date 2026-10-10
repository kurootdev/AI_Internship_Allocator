from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from related_skills import related_skills_mapping  # Import manual mapping

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed(texts):
    return model.encode(texts, convert_to_numpy=True)

def build_text_candidate_for_base(c, req_skills):
    """Build candidate text for base similarity using only required skills + degree + major"""
    cand_req_skills = [s for s in c.get("skills", []) if s in req_skills]
    return " ".join(cand_req_skills) + " " + c.get("degree", "") + " " + c.get("major", "")

def build_text_internship(i):
    return " ".join(i.get("requiredSkills", [])) + " " + i.get("sector", "")

def compute_scores(candidates, internships, related_threshold=0.6, extra_bonus_per_skill=0.05):
    """
    candidates: list of candidate dicts
    internships: list of internship dicts
    related_threshold: cosine similarity threshold for extra skill (optional)
    extra_bonus_per_skill: bonus per relevant extra skill
    """
    sims = np.zeros((len(candidates), len(internships)))

    for ci, c in enumerate(candidates):
        for ii, i in enumerate(internships):
            req_skills = set(i.get("requiredSkills", []))
            
            # Base similarity: only required skills + degree + major
            cand_base_text = build_text_candidate_for_base(c, req_skills)
            intern_text = build_text_internship(i)
            C_base = embed([cand_base_text])
            I_base = embed([intern_text])
            sims[ci, ii] = cosine_similarity(C_base, I_base)[0,0]

            # Preferred location bonus
            if i["locationDistrict"] in c.get("preferredLocations", []):
                sims[ci, ii] += 0.1

            # Degree match bonus
            if c["degree"] == i["minDegree"]:
                sims[ci, ii] += 0.1

            # Past participation penalty
            if c.get("pastParticipationCount", 0) > 0:
                sims[ci, ii] -= 0.1

            # Extra skills bonus (only if all required skills match)
            cand_skills = set(c.get("skills", []))
            if len(req_skills & cand_skills) == len(req_skills):  
                extra_skills = cand_skills - req_skills
                related_extra_count = 0

                for extra in extra_skills:
                    for req in req_skills:
                        if extra in related_skills_mapping.get(req, []):
                            related_extra_count += 1
                            break  # count each extra skill only once

                sims[ci, ii] += related_extra_count * extra_bonus_per_skill

    return sims
