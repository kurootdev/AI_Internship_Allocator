from pulp import LpProblem, LpMaximize, LpVariable, lpSum, LpBinary, PULP_CBC_CMD

def allocate(candidates, internships, scores, quotas=None):
    assignments = []
    cand_ids = [c["candidateId"] for c in candidates]
    int_ids = [i["internshipId"] for i in internships]

    prob = LpProblem("Allocation", LpMaximize)
    x = LpVariable.dicts("x", (cand_ids, int_ids), 0, 1, LpBinary)

    # Objective: maximize total score
    prob += lpSum(scores[r][j] * x[cand_ids[r]][int_ids[j]]
                  for r in range(len(cand_ids)) for j in range(len(int_ids)))

    # Constraint: each candidate can get at most 1 internship
    for r in range(len(cand_ids)):
        prob += lpSum(x[cand_ids[r]][iid] for iid in int_ids) <= 1

    # Constraint: internship capacity
    for j, iid in enumerate(int_ids):
        prob += lpSum(x[cid][iid] for cid in cand_ids) <= internships[j]["capacity"]

    # Quotas
    if quotas:
        for group, min_count in quotas.items():
            if group == "rural":
                group_cands = [c["candidateId"] for c in candidates if c.get("isRural")]
            else:
                group_cands = [c["candidateId"] for c in candidates if c.get("socialCategory") == group]

            # Only add constraint if enough candidates exist
            if group_cands and len(group_cands) >= min_count:
                prob += lpSum(x[cid][iid] for cid in group_cands for iid in int_ids) >= min_count

    # Solve LP
    prob.solve(PULP_CBC_CMD(msg=0))

    # Collect raw allocations
    raw_allocations = []
    for r, cid in enumerate(cand_ids):
        for j, iid in enumerate(int_ids):
            if x[cid][iid].value() == 1:
                raw_allocations.append({
                    "candidateId": cid,
                    "internshipId": iid,
                    "score": float(scores[r][j])
                })

    # Flexible quota handling + full capacity
    for internship in internships:
        iid = internship["internshipId"]
        capacity = internship.get("capacity", 0)
        selected = [alloc for alloc in raw_allocations if alloc["internshipId"] == iid]
        selected.sort(key=lambda x: x["score"], reverse=True)

        # If selected < capacity due to quota shortfall, fill remaining with top general candidates
        if len(selected) < capacity:
            remaining = capacity - len(selected)
            # Candidates not yet selected
            unselected = [c for c in raw_allocations if c not in selected]
            unselected.sort(key=lambda x: x["score"], reverse=True)
            selected.extend(unselected[:remaining])

        # Take only up to capacity
        final_selected = selected[:capacity]
        assignments.extend(final_selected)

    return assignments
