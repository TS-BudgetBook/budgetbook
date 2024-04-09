## Grafana Loki Repo hinzufügen

helm repo add grafana https://grafana.github.io/helm-charts

einmal das Repo updaten

helm repo update

helm upgrade --install loki grafana/loki -n metrics --values logging.yaml

helm upgrade --install promtail -n metrics grafana/pro

Dann in Grafana Loki als Datenquelle hinzufügen. In gleichen Namespace mit http://loki:3100