import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
  email: Yup.string()
    .email("Email address is not valid")
    .required("Email address is required"),
});

export { UserSchema };
