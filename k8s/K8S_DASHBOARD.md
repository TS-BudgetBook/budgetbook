kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml

kubectl get all -n kubernetes-dashboard

kubectl edit service/kubernetes-dashboard -n kubernetes-dashboard


kubectl get pods --all-namespaces

kubectl get svc --all-namespaces

kubectl apply -f ingress-dashboard.yaml

##### Der Befehl "kubectl create serviceaccount dashboard -n kubernetes-dashboard" erstellt einen Serviceaccount mit dem Namen "dashboard" im Namespace "kubernetes-dashboard".

kubectl create serviceaccount dashboard -n kubernetes-dashboard

### Der Befehl "kubectl get secret" wird verwendet, um das Service-Token-Geheimnis abzurufen.

kubectl get secret admin-user -n kubernetes-dashboard -o jsonpath={".data.token"} | base64 -d



## Neuen Hosteintrag hinzufügen
Editor als Admin starten und folgenden Eintrag in der hosts Datei (c:\Windows\System32\Drivers\etc\hosts) hinzufügen:

127.0.0.1 dashboard.me

### Navigieren Sie einfach zu https://dashboard.me , um auf das Kubernetes-Dashboard zuzugreifen.