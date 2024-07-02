import type {UserItem} from '../../types/user';

export const parseUserList = (data: any): UserItem[] => {
  return data.map((item: any) => {
    return {
      name: item?.name ? item.name : 'N/A',
      id: item?.id ?? '',
      email: item?.email ?? '',
    };
  });
};
