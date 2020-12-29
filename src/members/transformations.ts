import { Member } from './types';

export function transformMember(response: any): Member {
  const memberData = response?.member || response;

  if (!response) {
    return null;
  }

  return {
    id: memberData.id,
    token: response.token,
    email: memberData.email,
    firstName: memberData.firstName,
    lastName: memberData.lastName,
    avatarUrl: memberData.avatarUrl,
    hasNotificationConsent: memberData.hasNotificationConsent,
  };
}
