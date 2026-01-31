def create_tnp(data):
    return {
        "name": data.get("name"),
        "email": data.get("email"),
        "password": data.get("password"),
        "role": "tnp"
    }
