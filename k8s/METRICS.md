## Installation Prometheus

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

Installieren von Prometheus in einem metrics Namesapce

helm install prometheus prometheus-community/kube-prometheus-stack --namespace=metrics --create-namespace

Port Forward zum Prometheus Server via kubectl
Prometheus Pod ID anzeigen lassen

kubectl get pods -n metrics

kubectl port-forward prometheus-server<POD-ID> 9090:9090 -n metrics

## TLS Secret erstellen aus dem Cert für grafana.budgetbook.me
mkcert grafana.budgetbook.me

ACHTUNG:
Hostnamen nicht vergessen in der hosts einzutragen
127.0.0.1 grafana.budgetbook.me


kubectl create secret tls grafana-budgetbook-tls --cert=./grafana.budgetbook.me+3.pem --key=./grafana.budgetbook.me+3-key.pem -n metrics
