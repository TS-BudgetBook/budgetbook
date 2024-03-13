## Docker Desktop Kubernetes aktivieren
Prüfen ob das loale Cluster läuft:
kubectl get pods

## Neuen Hosteintrag hinzufügen
Editor als Admin starten und folgenden Eintrag in der hosts Datei (c:\Windows\System32\Drivers\etc\hosts) hinzufügen:

127.0.0.1 budgetbook.me

## Docker images bauen

Jeweils in auth, expense, frontend und statistics das Image bauen:

docker build -t <SERVICENAME>:latest .

Den Platzhalter <SERVICENAME> ersetzen durch den Service der gebaut werden soll.

## NGINX-INGRESS im Cluster installieren

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

## MYSQL Datenbank im Cluster installieren

helm upgrade --install mysql --set auth.database=budgetbook,auth.username=budgetbook,auth.password=BuDg3tB00k oci://registry-1.docker.io/bitnamicharts/mysql

Setzen von Parametern:
--set auth.database=budgetbook,auth.user=app_database,auth.password=BuDg3tB00k

## Mysql Root Password aus Secret extrahieren

kubectl get secret --namespace default mysql -o jsonpath="{.data.mysql-root-password}" | base64 -d

## TLS Zertifikate generieren
mkcert budgetbook.me localhost 127.0.0.1 ::1

K8s Secret erstellen:

Anzeigen lassen mit --dry-run
kubectl create secret tls budgetbook.me --cert=./budgetbook.me+3.pem --key=./budgetbook.me+3-key.pem --dry-run=client --output=yaml

Apply im Cluster
kubectl create secret tls budgetbook.me --cert=./budgetbook.me+3.pem --key=./budgetbook.me+3-key.pem

## Anwendung im Cluster deployen
cd k8s/
kubectl apply -f .

Danach prüfen ob die Pods laufen:
kubectl get pods

## Anwendung im Browser starten

https://budgetbook.me 