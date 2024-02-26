
## Zertifikate für lokale Entwicklungszwecke erstellt
Gehe in den proxy Ordner und erstelle einen neuen Ordner mit dem Namen "cert".

# mkcert installieren:
choco install mkcert

## Einrichten der lokalen CA:
Damit ein selbstsigniertes Zertifikat von den gängigen Webbrowsern als gültig anerkannt wird, müssen wir unserem System eine lokale CA (Certificate Authority oder Certification Authority) bekannt machen — dies können wir einfach via mkcert mit dem folgenden Befehl machen:

mkcert --install

## Nach dem download beide Zertifikate in den Ordner cert verschieben und umbenennen in:

docker.compose.local+3-key.pem
docker.compose.local+3-key.pem

## Nun im Ordner budget-book wechseln:
docker-compose up --build