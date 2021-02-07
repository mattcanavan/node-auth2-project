import * as yup from 'yup';

export default yup.object().shape({
    username: yup.string()
        .required('Username is required'),

    password: yup.string()
        .min(4, "Password must be 4 characters or longer.")
        .required('Password is required.'),

})