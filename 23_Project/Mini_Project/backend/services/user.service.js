import { User } from '../models/user.model.js';

const maskedPersonal = (personal) => {
  return personal.substr(0, 6) + '-' + personal.substr(6, 1) + '******';
};

export const createUser = ({
  name,
  email,
  personal,
  prefer,
  password,
  phone,
  og,
}) => {
  return new User({
    name,
    email,
    personal: maskedPersonal(personal),
    prefer,
    pwd: password,
    phone,
    og: {
      title: og.title,
      description: og.description,
      image: og.image,
    },
  });
};

export const saveUser = async ({ newUser }) => {
  await newUser.save();
};

export const getUsers = async () => {
  return await User.find();
};
