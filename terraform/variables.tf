variable "region" {
  description = "Default AWS Region"
  type        = string
  default     = "eu-central-1"
}

variable "cluster_name" {
  description = "Name of the Cluster"
  type = string
  default = "budgetbook"
}