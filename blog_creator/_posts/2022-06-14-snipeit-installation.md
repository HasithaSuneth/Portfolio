---
layout: post
title: "Snipe-IT Installation & Configuration Guide"
date: 2022-06-14 08:00:00 +0530
author: Admin
categories: deployment-guide
---

# Snipe-IT (Assets Management System) Installation on Ubuntu via Docker, Apache & Nginx

## About

Snipe-IT was made for asset management, to enable departments to track who has which asset, when it was purchased, which software licenses and accessories are available, and so on.

Snipe-IT is a Free Open Source (FOSS) web based project built on Laravel and it follows a standard Laravel MVC file structure.

This project is actively developed and they [release quite frequently](https://github.com/snipe/snipe-it/releases). Check out the [Snipe-IT website](https://snipeitapp.com/) for a [demo](https://snipeitapp.com/demo), a comprehensive list of features, screenshots and announcements for updates on new versions.

![Snipe-IT Dashboard](/blog/assets/imgs/snipeit-dashboard.webp)

<br>
#### On the official website of the **_Sri Lankan Ministry of Technology_**, I made this guide, and you can refer to each section as follows:

- #### [**Introduction**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide){:target="\_blank"}

- #### [**Features**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Features){:target="\_blank"}

- #### [**Video Guide (Features & Configurations)**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/Video%20guide){:target="\_blank"}

- #### [**Installation**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Installation){:target="\_blank"}
  - #### [**Install Snipe-IT via Docker**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Installation#install-snipe-it-docker){:target="\_blank"}
  - #### [**Install Snipe-IT via Apache**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Installation#install-snipe-it-apache){:target="\_blank"}
  - #### [**Install Snipe-IT via Nginx**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Installation#install-snipe-it-nginx){:target="\_blank"}
  - #### [**Pre-Flight**](https://mot.gov.lk/docs/resources/playbook/Guides%20and%20Tutorials/Asset%20Management%20using%20Snipe-IT/tutorial-Snipe-IT-Guide-Pre-Flight){:target="\_blank"}
