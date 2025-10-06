# Temporary Login Credentials

The backend automatically seeds two user accounts on startup if they do not already exist.

| Role   | Email                | Password    |
|--------|----------------------|-------------|
| Admin  | `admin@yashveerjicare.com`  | `Admin@123` |
| Patient| `patient@yashveerjicare.com`| `Patient@123` |

> **Note:** The login endpoint requires the `confirmPassword` field to match the password, and the `role` field must be set to either `Admin` or `Patient` accordingly.
