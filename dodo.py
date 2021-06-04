def task_build():
    """Build for production"""
    return {
        "actions": [
            "npm run build --prefix frontend",
            """sed -i "s#/assets#{{BASE_URL}}assets#"  frontend/dist/index.html""",
        ]
    }
