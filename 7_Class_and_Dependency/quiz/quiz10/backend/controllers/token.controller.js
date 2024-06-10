export class TokenController {
  tokenService;

  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  createAndSendPhoneToken = async (req, res) => {
    const { phone } = req.body;

    try {
      tokenService.validatePhoneNumber({ phone });

      const savedToken = await tokenService.getTokenByPhone({ phone });
      const tokenNumber = tokenService.createToken();

      if (savedToken) {
        await tokenService.updateToken({ savedToken, tokenNumber });
      } else {
        await tokenService.saveNewToken({ phone, tokenNumber });
      }

      // const message = await tokenService.sendTokenToSMS({ phone, token });

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
      const savedToken = await tokenService.getTokenByPhone({ phone });

      tokenService.verifyPhoneTokenExists({ savedToken });
      tokenService.verifyTokenMatch({ savedToken, tokenNumber });

      await tokenService.authorizeToken({ savedToken });

      res.send(true);
    } catch (error) {
      console.error(error.message);
      res.send(false);
    }
  };
}
