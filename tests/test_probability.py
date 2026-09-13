import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
result = subprocess.run(["node", str(ROOT / "tests" / "test_probability.js")], capture_output=True, text=True)
assert result.returncode == 0, result.stderr
print(result.stdout.strip())
