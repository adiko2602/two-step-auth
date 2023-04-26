### API
**endpoint:**
```
/auth/register
```
**body:**
```
{
    "email": "email",
    "password": "password"
}
```
**response:**
```
{
    "status": true,
    "message": "Created new account",
    "content": {
      "userSecret": "USER_SECRET"
    }
}
```
----------
**endpoint:**
```
/auth/login
```
**body:**
```
{
    "email": "email",
    "password": "password"
}
```
**response:**
```
{
    "status": true,
    "message": "User logged in",
    "content": {
      "tempJWT": "TEMP_JWT"
    }
}
```
----------
**endpoint:**
```
/auth/verify-totp
```
**body:**
```
{
    "TOTP": "6_DIGIT_TOTP"
}
```
**headers:**
```
Authorizaiton: "Bearer TEMP_JWT"
```
**response:**
```
{
    "status": true,
    "message": "TOTP verification successful",
    "content": {
      "JWT": "JWT"
    }
}
```
