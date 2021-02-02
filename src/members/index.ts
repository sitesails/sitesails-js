import FormData from 'form-data';

import SiteSailsClient from '../client';

import { transformMember } from './transformations';
import {
  Member,
  MemberLoginParams,
  MemberRegistrationParams,
  MemberSocialLoginParams,
  MemberUpdateParams,
} from './types';

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

  async register(params: MemberRegistrationParams): Promise<Member> {
    const result = await this.client.fetch(`/members/register`, null, {
      transformation: transformMember,
      method: 'POST',
      body: params,
    });

    return result;
  }

  async login(params: MemberLoginParams): Promise<Member> {
    const result = await this.client.fetch(`/members/authenticate`, null, {
      transformation: transformMember,
      method: 'POST',
      body: params,
    });

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

  async setData(data: Record<string, any>): Promise<Record<string, any>> {
    const result = await this.client.fetch(`/members/me/data`, null, {
      transformation: transformMember,
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${this.memberToken}`,
      },
    });

    return result;
  }

  async updateAvatar(file: any, fileName: string) {
    const formData = new FormData();
    formData.append('file', file, { filename: fileName });

    await this.client.fetch(`/members/me/avatar`, null, {
      transformation: transformMember,
      method: 'POST',
      formData,
      headers: {
        Authorization: `Bearer ${this.memberToken}`,
      },
    });
  }
}
