from pythreatmatrix import ThreatMatrix

obj = ThreatMatrix(
    "5d031089fe0dcaccc1f65c382c20f1e7",
    "http://localhost:80",
)

obj.send_observable_analysis_request(observable_name="scanme.org")
