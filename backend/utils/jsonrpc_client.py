import requests

session = requests.Session()  # 🔥 sesión persistente


def jsonrpc_call(url: str, params: dict):
    payload = {
        "jsonrpc": "2.0",
        "method": "call",
        "params": params,
        "id": 1,
    }

    response = session.post(url, json=payload)

    result = response.json()

    if "error" in result:
        raise Exception(result["error"])

    return result.get("result")