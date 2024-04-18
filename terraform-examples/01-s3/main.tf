provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "mybucket" {
  bucket = "bs-tf-bucket"
  tags = {
    Name = "MyBucket"
  }
}



