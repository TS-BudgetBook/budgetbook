module "local_file" {
  source       = "./tf-local-module"
  file_name    = "generated-file2.txt"
  file_content = "Das ist der Inhalt von unserem generierten File"
}
