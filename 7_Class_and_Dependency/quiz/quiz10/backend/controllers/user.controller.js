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
      const savedToken = await this.tokenService.getTokenByPhone({ phone });
      this.tokenService.verifyTokenAuthentication({ savedToken });
      const og = await MyScraping.getOpenGraph({ prefer });
      const newUser = this.userService.createUser({ ...req.body, og });
      await this.userService.saveUser({ newUser });
      const welcomeTemplate = this.emailService.getWelcomeTemplate({
        name,
        phone,
        prefer,
      });
      // await this.emailService.sendTemplateToEmail({ email, welcomeTemplate });
      res.send(newUser._id);
    } catch (error) {
      console.error(error.message);
      res.status(422).send(error.message);
    }
  };

  getUserInfo = async (req, res) => {
    const users = await this.userService.getUsers();
    console.log(users);
    res.send(users);
  };
}
