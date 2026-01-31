def create_student(data):
    return {
        "name": data.get("name"),
        "email": data.get("email"),
        "password": data.get("password"),

        "branch": data.get("branch"),
        "year": data.get("year"),
        "cgpa": data.get("cgpa"),

        "skills": data.get("skills", []),

        "resume": {
            "fileName": data.get("resume_name"),
            "filePath": data.get("resume_path")
        },

        "role": "student"
    }
