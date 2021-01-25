import { ss, memberData } from '../tests/setup';

describe('Connections', () => {
  const connection = 'likes';
  const productId = 2856;
  const slug = 'football';
  const nodes = 'products';

  it('should return a correct response after adding a connection to a node', async () => {
    const expectedConnectionResponse = {
      id: 67,
      parentId: null,
      nodeId: 2856,
      nodeName: 'Football',
      nodeSlug: 'football',
      nodeImageUrl: 'https://api.sitesails.com/public/',
      memberId: 11,
      memberFirstName: 'Karlo',
      memberLastName: 'Marinović',
      memberAvatarUrl: null,
      createdAt: '01/21/2021 19:28:36',
      data: {},
      contents: null,
    };
    const expectedConnectionKeys = Object.keys(expectedConnectionResponse);
    const { token } = await ss
      .members()
      .login({ email: memberData.email, password: memberData.password });
    const res = await ss.connections(connection).add({
      memberToken: token,
      nodeId: productId,
    });
    const resKeys = Object.keys(res);
    expect(resKeys).toEqual(expectedConnectionKeys);
  });

  it('should place connection type to a node response when connection added', async () => {
    // const expectedConnectionStatsResponse = { likes: { count: 1 } };
    // const expectedConnectionsResponse = ['likes'];
    // const { token } = await ss
    //   .members()
    //   .login({ email: memberData.email, password: memberData.password });
    // await ss.connections(connection).remove({
    //   memberToken: token,
    //   nodeId: productId,
    // });
    // await ss.connections(connection).add({
    //   memberToken: token,
    //   nodeId: productId,
    // });
    // const { connectionStats, connections } = await ss
    //   .nodes(nodes)
    //   .get(slug, { connections: 'likes', connectionStats: 'likes' });
    // const connectionsKeys = Object.keys(connections);
    // // TODO THIS DOES NOT ALWAYS PASS // CONNECTION DOES NOT SEEM TO BE ALWAYS ADDED, OR MULTIPLE ARE ADDED // NEED LOOK INTO
    // expect(connectionsKeys).toEqual(expectedConnectionsResponse);
    // expect(connectionStats).toEqual(expectedConnectionStatsResponse);
  });

  it('should remove connection type from a node when connection removed', async () => {
    const expectedConnectionStatsResponse = { likes: { count: 0 } };
    const expectedConnectionsResponse = {};
    const { token } = await ss
      .members()
      .login({ email: memberData.email, password: memberData.password });

    await ss.connections(connection).add({
      memberToken: token,
      nodeId: productId,
    });

    // TODO IT WOULD BE GOOD IF THERE WAS A RESPONSE HERE FOR REMOVE CONNECTION
    await ss.connections(connection).remove({
      memberToken: token,
      nodeId: productId,
    });

    const { connectionStats, connections } = await ss
      .nodes(nodes)
      .get(slug, { connections: 'likes', connectionStats: 'likes' });

    // TODO THIS PASSES 90% CASES // CONNECTION DOES NOT SEEM TO BE ALWAYS ADDED OR REMOVED, OR MULTIPLE ARE ADDED OR REMOVED// NEED LOOK INTO
    // TODO SHOULD WE SPECIFY WHICH CONNECTION TO REMOVE? // BC I KEEP ADDING LIKES AS THE SAME MEMBER, MAYBE BC OF THAT
    expect(connectionStats).toEqual(expectedConnectionStatsResponse);
    expect(connections).toEqual(expectedConnectionsResponse);
  });
});
