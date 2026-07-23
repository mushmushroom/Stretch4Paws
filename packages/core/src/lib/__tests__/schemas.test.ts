import { describe, it, expect } from 'vitest';
import { changePasswordSchema } from '../schemas/changePassword.schema';
import { editProfileSchema } from '../schemas/editProfile.schema';
import { loginMagicLinkSchema } from '../schemas/loginMagicLink.schema';
import { loginPasswordSchema } from '../schemas/loginPassword.schema';
import { registerSchema } from '../schemas/register.schema';
import { resetPasswordSchema } from '../schemas/resetPassword.schema';

// ─── helpers ────────────────────────────────────────────────────────────────

const VALID_PASSWORD = 'Secure1!';
const validRegister = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  password: VALID_PASSWORD,
  confirmPassword: VALID_PASSWORD,
};

function firstError(result: { error?: { issues: { message: string }[] } }) {
  return result.error?.issues[0]?.message;
}

// ─── changePasswordSchema ────────────────────────────────────────────────────

describe('changePasswordSchema', () => {
  it('passes with a valid password pair', () => {
    const result = changePasswordSchema.safeParse({
      password: VALID_PASSWORD,
      confirmPassword: VALID_PASSWORD,
    });
    expect(result.success).toBe(true);
  });

  it('rejects password shorter than 8 characters', () => {
    const result = changePasswordSchema.safeParse({
      password: 'Ab1!',
      confirmPassword: 'Ab1!',
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/at least 8 characters/i);
  });

  it('rejects password without uppercase letter', () => {
    const result = changePasswordSchema.safeParse({
      password: 'secure1!',
      confirmPassword: 'secure1!',
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/uppercase/i);
  });

  it('rejects password without lowercase letter', () => {
    const result = changePasswordSchema.safeParse({
      password: 'SECURE1!',
      confirmPassword: 'SECURE1!',
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/lowercase/i);
  });

  it('rejects password without a digit', () => {
    const result = changePasswordSchema.safeParse({
      password: 'SecureA!',
      confirmPassword: 'SecureA!',
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/number/i);
  });

  it('rejects password without a special character', () => {
    const result = changePasswordSchema.safeParse({
      password: 'Secure12',
      confirmPassword: 'Secure12',
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/special character/i);
  });

  it('rejects when passwords do not match', () => {
    const result = changePasswordSchema.safeParse({
      password: VALID_PASSWORD,
      confirmPassword: 'Different1!',
    });
    expect(result.success).toBe(false);
    const confirmError = result.error?.issues.find(
      (i) => i.path.includes('confirmPassword'),
    );
    expect(confirmError?.message).toMatch(/do not match/i);
  });

  it('rejects empty confirmPassword', () => {
    const result = changePasswordSchema.safeParse({
      password: VALID_PASSWORD,
      confirmPassword: '',
    });
    expect(result.success).toBe(false);
  });
});

// ─── editProfileSchema ───────────────────────────────────────────────────────

describe('editProfileSchema', () => {
  it('passes with name and valid email', () => {
    expect(
      editProfileSchema.safeParse({ name: 'Ada', email: 'ada@example.com' }).success,
    ).toBe(true);
  });

  it('passes with name and empty email string', () => {
    expect(editProfileSchema.safeParse({ name: 'Ada', email: '' }).success).toBe(true);
  });

  it('passes with name and no email field', () => {
    expect(editProfileSchema.safeParse({ name: 'Ada' }).success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = editProfileSchema.safeParse({ name: '', email: 'ada@example.com' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/required/i);
  });

  it('rejects an invalid email format', () => {
    const result = editProfileSchema.safeParse({ name: 'Ada', email: 'not-an-email' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/invalid email/i);
  });
});

// ─── loginMagicLinkSchema ────────────────────────────────────────────────────

describe('loginMagicLinkSchema', () => {
  it('passes with a valid email', () => {
    expect(loginMagicLinkSchema.safeParse({ email: 'user@example.com' }).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(loginMagicLinkSchema.safeParse({ email: 'not-an-email' }).success).toBe(false);
  });

  it('rejects an empty email', () => {
    expect(loginMagicLinkSchema.safeParse({ email: '' }).success).toBe(false);
  });

  it('rejects missing email field', () => {
    expect(loginMagicLinkSchema.safeParse({}).success).toBe(false);
  });
});

// ─── loginPasswordSchema ─────────────────────────────────────────────────────

describe('loginPasswordSchema', () => {
  it('passes with valid email and password', () => {
    expect(
      loginPasswordSchema.safeParse({ email: 'user@example.com', password: 'anything' }).success,
    ).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = loginPasswordSchema.safeParse({ email: 'bad', password: 'pw' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/invalid email/i);
  });

  it('rejects an empty password', () => {
    const result = loginPasswordSchema.safeParse({ email: 'user@example.com', password: '' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/required/i);
  });
});

// ─── registerSchema ──────────────────────────────────────────────────────────

describe('registerSchema', () => {
  it('passes with all valid fields', () => {
    expect(registerSchema.safeParse(validRegister).success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = registerSchema.safeParse({ ...validRegister, name: '' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/required/i);
  });

  it('rejects invalid email', () => {
    const result = registerSchema.safeParse({ ...validRegister, email: 'bad-email' });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/invalid email/i);
  });

  it('rejects password without uppercase', () => {
    const weak = 'secure1!';
    const result = registerSchema.safeParse({
      ...validRegister,
      password: weak,
      confirmPassword: weak,
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/uppercase/i);
  });

  it('rejects password without lowercase', () => {
    const weak = 'SECURE1!';
    const result = registerSchema.safeParse({
      ...validRegister,
      password: weak,
      confirmPassword: weak,
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/lowercase/i);
  });

  it('rejects password without digit', () => {
    const weak = 'SecureA!';
    const result = registerSchema.safeParse({
      ...validRegister,
      password: weak,
      confirmPassword: weak,
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/number/i);
  });

  it('rejects password without special character', () => {
    const weak = 'Secure12';
    const result = registerSchema.safeParse({
      ...validRegister,
      password: weak,
      confirmPassword: weak,
    });
    expect(result.success).toBe(false);
    expect(firstError(result)).toMatch(/special character/i);
  });

  it('rejects mismatched confirmPassword', () => {
    const result = registerSchema.safeParse({
      ...validRegister,
      confirmPassword: 'Different1!',
    });
    expect(result.success).toBe(false);
    const confirmError = result.error?.issues.find(
      (i) => i.path.includes('confirmPassword'),
    );
    expect(confirmError?.message).toMatch(/do not match/i);
  });

  it('rejects empty confirmPassword', () => {
    const result = registerSchema.safeParse({ ...validRegister, confirmPassword: '' });
    expect(result.success).toBe(false);
  });
});

// ─── resetPasswordSchema ─────────────────────────────────────────────────────

describe('resetPasswordSchema', () => {
  it('passes with a valid email', () => {
    expect(resetPasswordSchema.safeParse({ email: 'user@example.com' }).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(resetPasswordSchema.safeParse({ email: 'not-valid' }).success).toBe(false);
  });

  it('rejects an empty email', () => {
    expect(resetPasswordSchema.safeParse({ email: '' }).success).toBe(false);
  });
});
