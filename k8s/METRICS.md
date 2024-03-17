## Installation Prometheus

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

Installieren von Prometheus in einem metrics Namesapce

helm install prometheus prometheus-community/prometheus --namespace=metrics --create-namespace

Port Forward zum Prometheus Server via kubectl
Prometheus Pod ID anzeigen lassen

kubectl get pods -n metrics

kubectl port-forward prometheus-server<POD-ID> 9090:9090 -n metrics



## TLS Zertifikate generieren
mkcert prometheus.me localhost 127.0.0.1 ::1


K8s Secret erstellen:

kubectl create secret tls prometheus.me --cert=./prometheus.me+3.pem --key=./prometheus.me+3-key.pem -n metrics

kubectl apply -f ingress-prometheus.yaml




## Installation von Grafana


helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install grafana grafana/grafana --namespace=metrics --create-namespace


kubectl get svc grafana -n metrics


################################

## TLS Zertifikate für metrics(grafana)generieren

mkcert metrics.me localhost 127.0.0.1 ::1


K8s Secret erstellen:

kubectl create secret tls metrics.me --cert=./metrics.me+3.pem --key=./metrics.me+3-key.pem -n metrics

kubectl apply -f ingress-metrics.yaml

## Neuen Hosteintrag hinzufügen
Editor als Admin starten und folgenden Eintrag in der hosts Datei (c:\Windows\System32\Drivers\etc\hosts) hinzufügen:

127.0.0.1 metrics.me

## Neuen Hosteintrag hinzufügen
Editor als Admin starten und folgenden Eintrag in der hosts Datei (c:\Windows\System32\Drivers\etc\hosts) hinzufügen:

in Brauser öfnen: metrics.me

