import { ROUTES } from '@/view/constants';
import { enviromentService, Subscribable } from '@atom/common';
import OidcClient, { User, UserManager, UserManagerSettings } from 'oidc-client';

class OidcService extends Subscribable<User> {
  private static userManagerConfig: UserManagerSettings = {
    authority: enviromentService.get<{ identityServer: string }>('apiUrlPaths').identityServer,
    client_id: 'spa',
    redirect_uri: `${window.origin}${ROUTES.baseUrl}${ROUTES.callbackUrl}`,
    post_logout_redirect_uri: `${window.origin}${ROUTES.baseUrl}/loggedOut`,
    response_type: 'code',
    scope: 'openid profile email api offline_access'
  };

  private userManager: UserManager = null;
  private user: User = null;

  constructor() {
    super();

    this.userManager = new OidcClient.UserManager(OidcService.userManagerConfig);
  }

  subscribeForUpdate(cb: (user: User) => void) {
    this.subscribe(cb);

    if (this.user) cb(this.user);
  }

  signInRedirect() {
    this.userManager.signinRedirect();
  }

  signinRedirectCallback() {
    this.userManager.signinRedirectCallback().then((user) => {
      window.location.replace(window.origin);
    });
  }

  getUser() {
    return this.userManager
      .getUser()
      .then((user) => {
        if (!user) this.signInRedirect();

        this.publish(user);

        this.user = user;

        return user;
      })
      .catch(() => this.signInRedirect());
  }

  logOut() {
    this.userManager.signoutRedirect();
  }

  logOutCallback() {
    this.userManager.signoutPopupCallback();
  }
}

export type OidcUser = User;

export const oidcService = new OidcService();
