class AuthApi {
  constructor(request) {
    this.request = request;
  }

  async login(loginPayload) {
    return await this.request.post(
      'https://prodapp.swiftdata.ai/api/login/validateuser',
      {
        data: loginPayload,
      }
    );
  }
}

module.exports = { AuthApi };