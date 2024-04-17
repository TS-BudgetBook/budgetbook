output "file_path" {
  description = "This is the path of the generated file"
  value       = local_file.file.content
}
