from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import compute_scores
from allocate import allocate

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Flask ML API is running!"})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Invalid or missing JSON"}), 400

    if "candidate" not in data or "internships" not in data:
        return jsonify({"error": "Both 'candidate' and 'internships' are required"}), 400

    candidate = data["candidate"]
    internships = data["internships"]

    if isinstance(internships, dict):
        internships = [internships]

    k = 10
    
    try:
        # Compute similarity scores
        scores = compute_scores([candidate], internships)[0]

        # Rank internships
        ranked = sorted(
            [
                {
                    "internshipId": internships[i]["internshipId"],
                    "score": float(scores[i])
                }
                for i in range(len(internships))
            ],
            key=lambda x: x["score"],
            reverse=True
        )[:k]

        return jsonify({"recommendations": ranked})

    except Exception as e:
        return jsonify({"error": "compute_scores failed", "details": str(e)}), 500


@app.route("/allocate", methods=["POST"])
def run_allocate():
    data = request.json
    candidates = data["candidates"]
    internship_data = data["internship"]
    internships = [internship_data]
    quotas = internships[0].get("quotas", {})

    # Compute scores
    scores = compute_scores(candidates, internships)

    # Run allocation
    allottedInternshipToCandidates = allocate(candidates, internships, scores, quotas)
    return jsonify({"allottedInternshipToCandidates": allottedInternshipToCandidates})


if __name__ == "__main__":
    app.run(port=5000, debug=True)