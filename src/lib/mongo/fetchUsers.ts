import { getUsers } from '@/lib/mongo/users';

export async function fetchUsers() {
  const { users } = await getUsers();
  if (!users) throw new Error('Failed to fetch users!');
  return users;
}
