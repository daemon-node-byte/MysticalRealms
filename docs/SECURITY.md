# Security Policy

## Table of Contents

- [Reporting Security Vulnerabilities](#reporting-security-vulnerabilities)
- [Supported Versions](#supported-versions)
- [Security Architecture](#security-architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Data Protection](#data-protection)
- [Infrastructure Security](#infrastructure-security)
- [Development Security Practices](#development-security-practices)
- [Dependencies & Third-Party Services](#dependencies--third-party-services)
- [Security Testing](#security-testing)
- [Incident Response](#incident-response)
- [Security Resources](#security-resources)

## Reporting Security Vulnerabilities

### How to Report

We take security vulnerabilities seriously. If you discover a security vulnerability in MysticalRealms, please follow these steps:

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. **DO NOT** disclose the vulnerability publicly until we've had a chance to address it
3. **DO** send an email to: `security@mysticalrealms.com` (if available) or create a private security advisory on GitHub

### What to Include

When reporting a security vulnerability, please provide:

- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact and severity assessment
- **Reproduction**: Step-by-step instructions to reproduce the issue
- **Environment**: Browser, OS, and version information where applicable
- **Evidence**: Screenshots, logs, or proof-of-concept (if safe to share)
- **Suggested Fix**: If you have ideas for remediation

### Response Timeline

- **Acknowledgment**: Within 48 hours of report
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Weekly updates until resolution
- **Resolution**: Target 30-90 days depending on severity

### Security Advisory Process

1. We'll acknowledge receipt and begin investigation
2. We'll work with you to understand and validate the issue
3. We'll develop and test a fix
4. We'll coordinate disclosure timeline with you
5. We'll publish a security advisory after the fix is deployed

## Supported Versions

| Version | Supported          | Notes                  |
| ------- | ------------------ | ---------------------- |
| 1.x     | :white_check_mark: | Current stable release |
| 0.x     | :x:                | Development versions   |

**Note**: Only the latest stable release receives security updates. Please upgrade to the latest version to ensure you have the latest security patches.

## Security Architecture

### Overview

MysticalRealms follows a defense-in-depth security model with multiple layers:

```
┌─────────────────────────────────────────┐
│            User Interface               │
├─────────────────────────────────────────┤
│     Next.js Frontend (TypeScript)      │
│   • Client-side validation             │
│   • XSS protection                     │
│   • CSRF protection                    │
├─────────────────────────────────────────┤
│       Authentication Layer             │
│   • Supabase Auth                      │
│   • JWT tokens                         │
│   • Row Level Security (RLS)           │
├─────────────────────────────────────────┤
│      API Layer (FastAPI/Python)        │
│   • Input validation                   │
│   • Rate limiting                      │
│   • CORS configuration                 │
├─────────────────────────────────────────┤
│        Database Layer (Postgres)       │
│   • Row Level Security                 │
│   • Encrypted data at rest             │
│   • Connection encryption              │
└─────────────────────────────────────────┘
```

### Security Boundaries

- **Frontend**: Client-side input validation and sanitization
- **API Gateway**: Authentication, authorization, and rate limiting
- **Backend Services**: Business logic validation and secure data processing
- **Database**: Row-level security and data encryption

## Authentication & Authorization

### Supabase Authentication

We use Supabase Auth for secure user management:

- **Multi-factor Authentication**: Available for enhanced security
- **Email Verification**: Required for new accounts
- **Password Requirements**: Enforced strong password policies
- **Session Management**: Secure JWT-based sessions with automatic refresh
- **OAuth Providers**: Support for Google, GitHub, and other providers

### Authorization Model

```typescript
// Row Level Security (RLS) policies ensure users can only access their data
-- Example RLS policy
CREATE POLICY "Users can only see their own profile" ON profiles
    FOR ALL USING (auth.uid() = user_id);
```

### Token Security

- **JWT Tokens**: Short-lived access tokens with refresh rotation
- **Secure Storage**: Tokens stored in httpOnly cookies when possible
- **Automatic Refresh**: Transparent token refresh to maintain sessions
- **Logout**: Proper token invalidation on logout

## Data Protection

### Personal Information

MysticalRealms handles various types of personal data with appropriate protection:

#### Data Classifications

- **Public**: Profile names, public posts (non-sensitive)
- **Personal**: Email addresses, birth data for astrology charts
- **Sensitive**: Payment information, private journal entries
- **System**: Authentication tokens, session data

#### Data Handling Practices

- **Encryption at Rest**: All sensitive data encrypted in the database
- **Encryption in Transit**: TLS 1.3 for all communications
- **Data Minimization**: Only collect necessary data
- **Data Retention**: Automatic cleanup of expired sessions and temporary data
- **Right to Deletion**: Users can delete their accounts and data

### Database Security

```sql
-- Example of encrypted column for sensitive data
ALTER TABLE user_profiles
ADD COLUMN birth_data_encrypted BYTEA;

-- Row Level Security policies
ALTER TABLE user_journals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own journals only" ON user_journals
    FOR ALL USING (user_id = auth.uid());
```

### API Data Validation

```python
# FastAPI Pydantic models ensure type safety and validation
from pydantic import BaseModel, validator, EmailStr
from typing import Optional
import re

class UserProfile(BaseModel):
    email: EmailStr
    name: str
    birth_date: Optional[date] = None

    @validator('name')
    def validate_name(cls, v):
        if not re.match(r'^[a-zA-Z\s]{2,50}$', v):
            raise ValueError('Invalid name format')
        return v.strip()
```

## Infrastructure Security

### Environment Configuration

- **Environment Variables**: All secrets stored in environment variables
- **Variable Validation**: Runtime validation of required environment variables
- **Development vs Production**: Separate configurations with appropriate security levels

### Container Security

```dockerfile
# Security-focused Dockerfile practices
FROM node:18-alpine AS builder
# Use non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Production container
FROM node:18-alpine AS runner
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
```

### Network Security

- **HTTPS Only**: All production traffic encrypted
- **CORS Configuration**: Restrictive CORS policies
- **CSP Headers**: Content Security Policy headers
- **Rate Limiting**: API endpoints protected against abuse

## Development Security Practices

### Secure Coding Guidelines

#### Frontend (Next.js/TypeScript)

```typescript
// ✅ Good: Sanitize user input
import DOMPurify from "isomorphic-dompurify";

const sanitizedContent = DOMPurify.sanitize(userInput);

// ✅ Good: Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing required environment variable");
}

// ❌ Bad: Direct DOM manipulation with user content
document.innerHTML = userInput; // XSS vulnerability
```

#### Backend (FastAPI/Python)

```python
# ✅ Good: Use parameterized queries
async def get_user_data(user_id: UUID):
    query = "SELECT * FROM users WHERE id = $1"
    return await db.fetch(query, user_id)

# ✅ Good: Input validation with Pydantic
class CreateUserRequest(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=50)

    @validator('name')
    def sanitize_name(cls, v):
        return html.escape(v.strip())

# ❌ Bad: SQL injection vulnerability
query = f"SELECT * FROM users WHERE id = '{user_id}'"  # Don't do this
```

### Code Review Security Checklist

- [ ] Input validation on all user inputs
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding/sanitization)
- [ ] Authentication checks on protected endpoints
- [ ] Authorization checks for data access
- [ ] Secure error handling (no sensitive info in errors)
- [ ] HTTPS enforcement
- [ ] Environment variable validation

### Git Security

```bash
# Use git-secrets to prevent committing secrets
git secrets --register-aws
git secrets --install
git secrets --scan

# Example .gitignore for sensitive files
.env
.env.local
.env.production
*.pem
*.key
*.p12
```

## Dependencies & Third-Party Services

### Dependency Management

```json
// package.json - Regular dependency audits
{
  "scripts": {
    "audit": "npm audit --audit-level moderate",
    "audit:fix": "npm audit fix"
  }
}
```

```python
# requirements.txt - Python dependencies with pinned versions
fastapi==0.104.1
pydantic==2.4.2
supabase==1.2.0
```

### Third-Party Service Security

#### Supabase

- **Database**: Postgres with Row Level Security enabled
- **Auth**: OAuth 2.0 compliant authentication
- **Storage**: Encrypted file storage with access policies
- **Edge Functions**: Serverless functions with isolated execution

#### Trusted Dependencies Only

- Regular security audits of all dependencies
- Automated dependency update monitoring
- Vulnerability scanning in CI/CD pipeline

### Supply Chain Security

```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Audit npm packages
        run: npm audit --audit-level moderate
      - name: Audit Python packages
        run: pip-audit
```

## Security Testing

### Automated Security Testing

#### Static Analysis Security Testing (SAST)

```yaml
# ESLint security rules
{
  "extends": ["@typescript-eslint/recommended", "plugin:security/recommended"],
  "plugins": ["security"],
  "rules":
    {
      "security/detect-object-injection": "error",
      "security/detect-non-literal-regexp": "error"
    }
}
```

#### Dependency Scanning

```bash
# Regular security scans
npm audit --audit-level moderate
pip-audit
bandit -r apps/api/  # Python security linter
```

### Manual Security Testing

#### Penetration Testing Checklist

- [ ] **Authentication bypass attempts**
- [ ] **SQL injection testing**
- [ ] **XSS vulnerability testing**
- [ ] **CSRF protection verification**
- [ ] **Authorization bypass testing**
- [ ] **File upload security testing**
- [ ] **API rate limiting testing**
- [ ] **Session management testing**

#### Security Test Examples

```typescript
// Example security test
describe("Authentication Security", () => {
  it("should prevent access to protected routes without auth", async () => {
    const response = await fetch("/api/user/profile");
    expect(response.status).toBe(401);
  });

  it("should validate JWT tokens properly", async () => {
    const invalidToken = "invalid.jwt.token";
    const response = await fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${invalidToken}` }
    });
    expect(response.status).toBe(401);
  });
});
```

### Security Monitoring

```typescript
// Example security event logging
export function logSecurityEvent(event: SecurityEvent) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      type: "SECURITY_EVENT",
      severity: event.severity,
      description: event.description,
      userAgent: event.userAgent,
      ip: event.ip,
      userId: event.userId
    })
  );
}
```

## Incident Response

### Security Incident Classification

#### Severity Levels

- **Critical**: Data breach, authentication bypass, remote code execution
- **High**: Privilege escalation, sensitive data exposure
- **Medium**: Denial of service, information disclosure
- **Low**: Security misconfigurations, minor vulnerabilities

### Incident Response Process

1. **Detection & Analysis**

   - Monitor security alerts and logs
   - Validate and classify the incident
   - Assess impact and scope

2. **Containment**

   - Isolate affected systems
   - Preserve evidence
   - Implement temporary fixes

3. **Eradication & Recovery**

   - Remove threat completely
   - Apply permanent fixes
   - Restore normal operations

4. **Post-Incident Activities**
   - Document lessons learned
   - Update security procedures
   - Conduct post-mortem review

### Emergency Contacts

- **Security Team**: security@mysticalrealms.dev
- **Development Team**: dev-team@mysticalrealms.dev
- **Infrastructure**: ops@mysticalrealms.dev

## Security Resources

### Security Training

- **OWASP Top 10**: Regular training on common web vulnerabilities
- **Secure Coding**: Guidelines for secure development practices
- **Privacy Regulations**: GDPR, CCPA compliance training

### Security Tools

#### Development Tools

- **ESLint Security Plugin**: Automated security linting
- **Bandit**: Python security static analysis
- **npm audit**: Dependency vulnerability scanning
- **git-secrets**: Prevent committing secrets

#### Monitoring Tools

- **Supabase Dashboard**: Real-time security monitoring
- **Log Analysis**: Security event correlation
- **Uptime Monitoring**: Service availability tracking

### External Resources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
- [Supabase Security Documentation](https://supabase.com/docs/guides/auth/auth-helpers)

---

## Updates to This Policy

This security policy is reviewed and updated quarterly. Major changes will be communicated through:

- GitHub releases and changelogs
- Security advisory notifications
- Developer documentation updates

<!-- **Last Updated**: December 2024
**Next Review**: March 2025
**Version**: 1.0.0 -->

---

_For questions about this security policy, please contact our security team or create a discussion in the repository._
