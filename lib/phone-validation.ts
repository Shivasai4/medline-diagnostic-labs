const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/

export function sanitizeIndianPhoneInput(value: string) {
  let digitsOnly = value.replace(/\D/g, "")

  // Convert +91XXXXXXXXXX/91XXXXXXXXXX style input to local 10-digit format.
  if (digitsOnly.length > 10 && digitsOnly.startsWith("91")) {
    digitsOnly = digitsOnly.slice(2)
  }

  return digitsOnly.slice(0, 10)
}

export function isValidIndianPhone(phone: string) {
  return INDIAN_PHONE_REGEX.test(phone)
}

export function getIndianPhoneError(phone: string) {
  if (!phone) {
    return "Phone number is required."
  }

  if (phone.length !== 10) {
    return "Phone number must be exactly 10 digits."
  }

  if (!/^[6-9]/.test(phone)) {
    return "Phone number must start with 6, 7, 8, or 9."
  }

  if (!/^\d{10}$/.test(phone)) {
    return "Phone number can contain digits only."
  }

  return null
}
