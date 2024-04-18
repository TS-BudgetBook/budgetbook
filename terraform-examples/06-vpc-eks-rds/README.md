##Testen der RDS Verbindung

MYSQL_HOST
MYSQL_USER
MYSQL_PASSWORD
MYSQL_DATABASE

export MYSQL_HOST=$(aws rds describe-db-instances --db-instance-identifier budgetbook-rds | jq  '.DBInstances[0].Endpoint.Address')
export MYSQL_USER="budgetbook"
export MYSQL_PASSWORD="BuDg3tB00k\!"
export MYSQL_DATABASE="budgetbook"

kubectl run mysql-client --rm --tty -i --restart='Never' --image  docker.io/bitnami/mysql:8.0.36-debian-12-r8 --namespace default --env MYSQL_HOST=$MYSQL_HOST --env MYSQL_USER=$MYSQL_USER --env MYSQL_PASSWORD=$MYSQL_PASSWORD --env MYSQL_DATABASE=$MYSQL_DATABASE --command -- bash

 :q
 ".DBInstances[0].Endpoint.Address"

 BuDg3tB00k!

