def create_recruiter(data, tnp_id):
    return {
        "companyName": data.get("companyName"),
        "contactEmail": data.get("contactEmail"),
        "jobs": data.get("jobs", []),
        "addedBy": tnp_id
    }
