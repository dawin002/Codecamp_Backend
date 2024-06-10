export class TokenController {
  tokenService;

  constructor({ tokenService }) {
    this.tokenService = tokenService;
  }

  createAndSendPhoneToken = async (req, res) => {
    const { phone } = req.body;

    try {
      this.tokenService.validatePhoneNumber({ phone });

      const savedToken = await this.tokenService.getTokenByPhone({ phone });
      const tokenNumber = this.tokenService.createToken();

      if (savedToken) {
        await this.tokenService.updateToken({ savedToken, tokenNumber });
      } else {
        await this.tokenService.saveNewToken({ phone, tokenNumber });
      }

      // const message = await this.tokenService.sendTokenToSMS({ phone, token });

      // res.send(message);
      res.send('인증 번호를 전송했습니다.');
    } catch (error) {
      console.error(error.message);
      res.status(422).send(error.message);
    }
  };

  verifyPhoneToken = async (req, res) => {
    const { phone, tokenNumber } = req.body;

    try {
      const savedToken = await this.tokenService.getTokenByPhone({ phone });

      this.tokenService.verifyPhoneTokenExists({ savedToken });
      this.tokenService.verifyTokenMatch({ savedToken, tokenNumber });

      await this.tokenService.authorizeToken({ savedToken });

      res.send(true);
    } catch (error) {
      console.error(error.message);
      res.send(false);
    }
  };
}
