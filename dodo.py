DOIT_CONFIG = {"verbosity": 2, "default_tasks": ["build"]}


def task_build():
    """Build for production"""
    return {
        "actions": [
            "npm run build --prefix frontend",
            """sed -i "s#/assets#{{URL_PREFIX}}assets#"  frontend/dist/index.html""",
        ]
    }


def task_build_dev():
    """Build for dev"""
    return {
        "actions": [
            "cd frontend && node node_modules/vite/bin/vite.js build --mode development --minify false --sourcemap true",
            """sed -i "s#/assets#{{URL_PREFIX}}assets#"  frontend/dist/index.html""",
        ]
    }
