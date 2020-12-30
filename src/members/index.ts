import SiteSailsClient from '../client';

import { transformMember } from './transformations';
import { Member, MemberSocialLoginParams, MemberUpdateParams } from './types';

export default class SiteSailsMemberManager {
  client: SiteSailsClient;
  memberToken: string;

  constructor(client: SiteSailsClient, memberToken: string) {
    this.client = client;
    this.memberToken = memberToken;
  }

  async get(id?: number | string): Promise<Member> {
    let result = null;

    if (id) {
      result = await this.client.fetch(`/members/${id}`, null, {
        transformation: transformMember,
      });
    } else if (this.memberToken) {
      result = await this.client.fetch(
        `/members/me`,
        {
          headers: {
            Authorization: `Bearer ${this.memberToken}`,
          },
        },
        {
          transformation: transformMember,
        },
      );
    } else {
      throw new Error('You must provide id or a member token');
    }

    return result;
  }

  async socialLogin(params: MemberSocialLoginParams): Promise<Member> {
    const result = await this.client.fetch(
      `/members/authenticate-social`,
      null,
      {
        transformation: transformMember,
        method: 'POST',
        body: params,
      },
    );

    return result;
  }

  async update(params: MemberUpdateParams): Promise<Member> {
    const result = await this.client.fetch(`/members/me`, null, {
      transformation: transformMember,
      method: 'PATCH',
      body: params,
      headers: {
        Authorization: `Bearer ${this.memberToken}`,
      },
    });

    return result;
  }

  // TODO: make this work. When called from outside, it doesn't send the correct
  //       form data and we're getting back 400
  //
  // async updateAvatar(formData: any) {
  //   const result = await fetch(
  //     `https://api-next.sitesails.com/api/v1/members/me/avatar`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${this.memberToken}`,
  //       },
  //       body: formData,
  //     },
  //   );
  // }
}
