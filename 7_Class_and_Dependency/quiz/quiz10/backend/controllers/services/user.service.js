import { User } from '../../models/user.model.js';

export class UserService {
  maskedPersonal = (personal) => {
    return personal.substr(0, 6) + '-' + personal.substr(6, 1) + '******';
  };

  createUser = ({ name, email, personal, prefer, password, phone, og }) => {
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

  saveUser = async ({ newUser }) => {
    await newUser.save();
  };

  getUsers = async () => {
    return await User.find();
  };
}
