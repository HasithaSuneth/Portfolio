---
layout: post
title: "Portainer Installation/ Deployment"
date: 2023-03-16 11:35:49 +0530
author: Admin
categories: deployment-guide
---

# Portainer Install on Ubuntu via Docker & Docker-Compose

## About

Portainer Community Edition (CE) is a powerful, open-source toolset that allows you to easily build and manage containers in Docker, Docker Swarm, Kubernetes, and Azure ACI. Portainer consists of two elements, the Portainer Server, and the Portainer Agent. Both elements run as lightweight Docker containers on a Docker engine.

Portainer CE is available to install with Docker on Linux, Docker on WSL/Docker Desktop, and Docker on Windows Container Service. In this tutorial, we are going to install Portainer with Docker on the Linux option and use Ubuntu as the Linux distro.

- [Official Website](https://www.portainer.io/)
- [Official Documentation](https://docs.portainer.io/)

## Steps

1. Install Docker and Docker-Compose
2. Install & Set up Portainer

## Prerequisites

To install Docker Engine, you need the 64-bit version of one of these Ubuntu versions:

- Ubuntu Kinetic 22.10
- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Focal 20.04 (LTS)
- Ubuntu Bionic 18.04 (LTS)

Docker Engine is compatible with x86_64 (or amd64), armhf, arm64, and s390x architectures.

## 1. Install Docker, and Docker-Compose

Docker Engine is an open source containerization technology for building and containerizing your applications. Docker Engine acts as a client-server application with:

- A server with a long-running daemon process dockerd.
- APIs which specify interfaces that programs can use to talk to and instruct the Docker daemon.
- A command line interface (CLI) client docker.

The CLI uses Docker APIs to control or interact with the Docker daemon through scripting or direct CLI commands. Many other Docker applications use the underlying API and CLI. The daemon creates and manage Docker objects, such as images, containers, networks, and volumes.

### 1.1. Install Docker

- [Official Documentation](https://docs.docker.com/engine/install/ubuntu/)

Follow this [Official Guide](https://docs.docker.com/engine/install/) for install Docker on other Linux distribution systems.

#### 1.1.1. Uninstall old versions

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### 1.1.2. Set up the repository

_Update the apt package index and install packages to allow apt to use a repository over HTTPS:_

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
```

_Add Docker’s official GPG key:_

```bash
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

_Use the following command to set up the repository:_

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### 1.1.3. Install Docker Engine

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

_Verify that Docker Engine is installed correctly_

```bash
sudo systemctl is-active docker
```

### 1.2. Install Docker-Compose

- [Official Documentation](https://docs.docker.com/compose/install/other/)

Download the latest version (in this case it is v2.16.0, this may change whenever you read this tutorial!)

```bash
curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

_Verify that Docker Engine is installed correctly_

```bash
sudo docker-compose --version
```

### 1.3. (_optional_) Add your linux user to the _Docker_ group

```
sudo usermod -aG docker $USER
```

## 2. Install & Set up Portainer

- [Official Documentation](https://docs.portainer.io/start/install-ce/server/docker/linux)

### 2.1. Create a new Docker Volume

This volume that Portainer Server will use to store its database.

```bash
docker volume create portainer_data
```

### 2.2. Launch Portainer

Download and install the Portainer Server container.

```bash
docker run -d -p 8000:8000 -p 9443:9443 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```

### 2.3. Logging In

Logging into your Portainer Server instance by opening a web browser and going to:

```
https://localhost:9443
```

Replace `localhost` with the relevant IP address or FQDN if needed, and adjust the port if you changed it earlier.
