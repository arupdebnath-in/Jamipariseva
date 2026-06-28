# eSign & Khatian Service

## Overview

This project is a Spring Boot application that provides:

* Uploading PDF documents
* Fetching Khatian documents
* Generating SHA-256 signatures for documents
* Storing document metadata and signatures in PostgreSQL

---

## Technology Stack

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Maven

---

## Prerequisites

Before running the application, ensure the following are installed:

* Java 17 or later
* Maven
* PostgreSQL
* Git

---

# Project Setup

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## Step 2: Create PostgreSQL Database

Create a new PostgreSQL database.

Example:

```sql
CREATE DATABASE esign_db;
```

> **Note:** The application creates the required tables automatically during startup using Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

---

## Step 3: Configure Database Connection

Open:

```
src/main/resources/application.properties
```

Update the PostgreSQL connection details:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/esign_db
spring.datasource.username=<your_postgres_username>
spring.datasource.password=<your_postgres_password>

spring.jpa.hibernate.ddl-auto=update
```

Replace:

* `<your_postgres_username>`
* `<your_postgres_password>`

with your local PostgreSQL credentials.

---

## Step 4: Run the Application

Run the Spring Boot application.

During startup:

* Database tables are created automatically (if they do not exist).
* Sample Khatian PDF documents are loaded automatically by the DataLoader (if they are not already present).

---

# API Endpoints

---

## 1. Upload Khatian PDF

Stores a PDF inside the `khatian_documents` table.

### Endpoint

```
POST http://localhost:8085/khatian_services/esign/upload
```

### Content-Type

```
multipart/form-data
```

### Form Data

| Key          | Type | Description    |
| ------------ | ---- | -------------- |
| file         | File | PDF Document   |
| khatianNo    | Text | Khatian Number |
| villageCode  | Text | Village Code   |
| districtCode | Text | District Code  |

### Sample Response

```json
{
    "message": "PDF stored successfully",
    "fileName": "sample.pdf",
    "khatianNo": "121"
}
```

---

## 2. Fetch Khatian Document

Returns the stored PDF as a Base64 encoded document.

### Endpoint

```
POST http://localhost:8085/khatian_services/esign/frskhatian
```

### Request Body

```json
{
    "khatianNo":"121",
    "villageCode":"922855",
    "districtCode":"272"
}
```

### Sample Response

```json
{
    "documentId":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "fileName":"sample.pdf",
    "base64Document":"JVBERi0xLjQK..."
}
```
---

# Database Tables

The application creates the following tables automatically:

* documents
* khatian_documents

---

# Sample Data

On first startup, the application automatically inserts sample Khatian PDF records if they are not already present.

If the records already exist, they are not inserted again.

---

# Project Structure

```
src
├── controller
├── dto
├── entity
├── repository
├── services
├── config
│   └── DataLoader.java
└── resources
    └── sample-pdfs
```

---

# Notes

* PostgreSQL database must exist before starting the application.
* Update the database username and password in `application.properties`.
* Tables are created automatically.
* Sample Khatian data is loaded automatically on first startup.
* Use Postman to test the APIs.
