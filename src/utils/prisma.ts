import { prismaClient } from '../prisma/client';
import { UserSearchParams } from '../@types/types';
const buildWhereClause = (search: UserSearchParams) => {
  if (search.email) {
    return { email: search.email };
  } else if (search.name) {
    return { name: search.name };
  } else if (search.id) {
    return { id: search.id };
  } else {
    throw new Error('No valid search parameter provided');
  }
};
export const findUser = async (search: UserSearchParams) =>
  await prismaClient.user.findUnique({
    where: buildWhereClause(search),
    include: {
      roles: true, // This will include the related roles
    },
  });

export const findRole = async (role: string) =>
  await prismaClient.role.findUnique({
    where: { name: role },
  });
export const checkAppSecByUrl = async (path: string) =>
  await prismaClient.appsec.findFirst({
    where: { url: path },
    include: { roles: true }, // include roles for the app
  });
