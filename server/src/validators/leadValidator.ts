import { body } from "express-validator";

export const createLeadValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("status")
    .isIn([
      "new",
      "contacted",
      "qualified",
      "lost",
    ])
    .withMessage(
      "Invalid status"
    ),

  body("source")
    .isIn([
      "website",
      "instagram",
      "referral",
      "linkedin",
    ])
    .withMessage(
      "Invalid source"
    ),
];