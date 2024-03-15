## Installation Prometheus

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

Installieren von Prometheus in einem metrics Namesapce

helm install prometheus prometheus-community/prometheus --namespace=metrics --create-namespace