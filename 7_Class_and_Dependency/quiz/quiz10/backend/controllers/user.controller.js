import { MyScraping } from '../utils/myscraping.js';

export class UserController {
  userService;
  tokenService;
  emailService;

  constructor({ userService, tokenService, emailService }) {
    this.userService = userService;
    this.tokenService = tokenService;
    this.emailService = emailService;
  }

  signUpUser = async (req, res) => {
    const { name, email, personal, prefer, password, phone } = req.body;
    try {
      const savedToken = await tokenService.getTokenByPhone({ phone });
      tokenService.verifyTokenAuthentication({ savedToken });
      const og = await MyScraping.getOpenGraph({ prefer });
      const newUser = userService.createUser({ ...req.body, og });
      await userService.saveUser({ newUser });
      const welcomeTemplate = emailService.getWelcomeTemplate({
        name,
        phone,
        prefer,
      });
      // await emailService.sendTemplateToEmail({ email, welcomeTemplate });
      res.send(newUser._id);
    } catch (error) {
      console.error(error.message);
      res.status(422).send(error.message);
    }
  };

  getUserInfo = async (req, res) => {
    const users = await userService.getUsers();
    console.log(users);
    res.send(users);
  };
}
