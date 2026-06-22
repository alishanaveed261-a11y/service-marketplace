# API Documentation

## Authentication APIs

### Register User

**POST**

```text
/api/auth/register
```

Request Body:

```json
{
  "name": "Ali",
  "email": "ali@gmail.com",
  "password": "123456",
  "role": "customer"
}
```

---

### Login User

**POST**

```text
/api/auth/login
```

Request Body:

```json
{
  "email": "ali@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Service APIs

### Get All Services

**GET**

```text
/api/services
```

---

### Get Single Service

**GET**

```text
/api/services/:id
```

---

### Create Service

**POST**

```text
/api/services
```

Authorization:

```text
Bearer Token Required
```

---

### Update Service

**PUT**

```text
/api/services/:id
```

---

### Delete Service

**DELETE**

```text
/api/services/:id
```

---

## Booking APIs

### Create Booking

**POST**

```text
/api/bookings
```

Request Body:

```json
{
  "service": "serviceId"
}
```

---

### Get My Bookings

**GET**

```text
/api/bookings/my-bookings
```

---

### Cancel Booking

**PUT**

```text
/api/bookings/:id/cancel
```

---

### Update Booking Status

**PUT**

```text
/api/bookings/:id/status
```

Allowed Status Values:

* pending
* accepted
* in_progress
* completed
* delivered
* cancelled

---

## Dashboard APIs

### Customer Dashboard

```text
GET /api/dashboard/customer
```

### Provider Dashboard

```text
GET /api/dashboard/provider
```

### Admin Dashboard

```text
GET /api/dashboard/admin
```
