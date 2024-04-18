output "availibility_zones" {
  value = data.aws_availability_zones.availibility_zones.names
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_name" {
  description = "Name of the Cluster"
  value       = local.cluster_name
}
