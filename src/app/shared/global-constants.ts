export class GlobalConstants {
  // Message
  public static GENERIC_ERROR: string =
    'Something went wrong. Please try again later.';

  public static UNAUTHORIZED: string =
    'You are not authorized person to access this page.';

  public static PRODUCT_EXIST_ERROR: string = 'Product already exists.';

  public static PRODUCT_ADDED: string = 'Product added successfully.';

  // Regex
  public static NAME_REGEX: string = '^[a-zA-Z\\s]+$';
  public static EMAIL_REGEX: string =
    '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';
  public static CONTACT_NUMBER_REGEX: string = '^[0-9]{10}$';
  public static NUMBER_REGEX: string = '^[0-9]+$';

  // Variable
  public static ERROR: string = 'error';
}
