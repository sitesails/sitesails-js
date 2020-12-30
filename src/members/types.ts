export type Member = {
  id: number;
  token?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  hasNotificationConsent: boolean;
};

export type MemberSocialLoginParams = {
  idToken?: string;
  accessToken?: string;
  provider: 'google';
};

export type MemberUpdateParams = {
  firstName?: string;
  lastName?: string;
  hasNotificationConsent?: boolean;
};
