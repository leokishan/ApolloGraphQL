import { throwError } from "./throwError";

export const fieldValitationTypes = {
  email: /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  date: /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/
};

export const validateFieldValue = (
  value: string,
  type: keyof typeof fieldValitationTypes,
  fieldName?: string
) => {
  let isMatched: RegExpMatchArray;
  switch (type) {
    case "email":
      isMatched = value.match(new RegExp(fieldValitationTypes[type]));
      if (!isMatched)
        throwError(`Please enter ${fieldName ||"email address"} in valid format.`, 400);
    case "password":
      isMatched = value.match(new RegExp(fieldValitationTypes[type]));
      if (!isMatched)
        throwError(
          `${fieldName || "Password"} should be of minimum 8 character and should contain atleast one uppercase, lowercase, number and special character.`,
          400
        );
        case "date":
          isMatched = value.match(new RegExp(fieldValitationTypes[type]));
          if (!isMatched)
            throwError(
              `Please enter ${fieldName || "Date"} in MM/dd/yyyy format.`,
              400
            );
    default:
      break;
  }
};
