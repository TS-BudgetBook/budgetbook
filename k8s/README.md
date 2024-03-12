## NGINX-INGRESS im Cluster installieren

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

## MYSQL Datenbank im Cluster installieren

helm upgrade --install mysql oci://registry-1.docker.io/bitnamicharts/mysql

Setzen von Parametern:
--set auth.database=budgetbook,auth.user=app_database,auth.password=BuDg3tB00k

## Mysql Root Password aus Secret extrahieren

kubectl get secret --namespace default mysql -o jsonpath="{.data.mysql-root-password}" | base64 -d