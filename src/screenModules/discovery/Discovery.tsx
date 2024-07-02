/**
 * @author Rahul Rajput
 * @email rahul@studiographene.com
 * @create date 2020-05-06 09:51:44
 * @modify date 2022-08-28 17:37:53
 * @desc [Discovery screen placeholder]
 */

/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import WrappedComponent from '../../components/WrapperComponent';
import SGTouchable from '../../components/SGTouchable';
import {getUserList} from '../../redux/user/Action';
import SGHeader from '../../components/SGHeader';
import {Texts} from '../../constants/Strings';
import {useReduxDispatch, useReduxSelector} from '../../store';
import {UserItem} from '../../types/user';
import {StackScreenComponent} from '../../types/navigation';

type RenderUserItemProps = {
  item: UserItem;
};

const Discovery: StackScreenComponent = props => {
  const dispatch = useReduxDispatch();
  const {userList} = useReduxSelector(state => state.userReducer);
  const [userListTemp, setUserListTemp] = useState<UserItem[]>([]);
  const userListCount = useMemo<number>(
    () => userListTemp?.length,
    [userListTemp?.length],
  );

  const getData = () => {
    props.showLoader();
    const onSuccess = (userListData: UserItem[]) => {
      setUserListTemp(userListData);
      props.hideLoader();
    };
    const onError = () => {
      props.hideLoader();
    };
    dispatch(getUserList(onSuccess, onError));
  };

  const renderUserItem = useCallback(
    ({item}: RenderUserItemProps) => (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          backgroundColor: 'pink',
          width: '100%',
        }}>
        <Text>{item.name}</Text>
      </View>
    ),
    [],
  );

  return (
    <>
      <SGHeader title={Texts.discovery} showBack={false} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 10}}>
          <Text>Discovery page</Text>
          <Text>{`User count: ${userListCount}`}</Text>
          <View style={{margin: 20}}>
            <SGTouchable onPress={getData}>
              <Text>Press here</Text>
            </SGTouchable>
            <FlatList
              data={userList}
              renderItem={renderUserItem}
              keyExtractor={index => index.toString()}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default WrappedComponent(Discovery);
