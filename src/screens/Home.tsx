import * as React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, List, ListIconProps} from 'react-native-paper';
import {useQuery} from 'react-query';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import EmptyComponent from '../components/EmptyComponent';

import {getUsers} from '../services/api';

const ListIcon = (props: Pick<ListIconProps, 'color' | 'style'>) => (
  <List.Icon {...props} icon="account-circle" />
);

//  Screen component: Default export
const Home = () => {
  const {colors} = useTheme();
  const {data} = useQuery('users', getUsers);

  const renderItem = ({item}: {item: any}) => (
    <List.Item
      key={'user' + item.id}
      title={item.name}
      description={item.email}
      left={ListIcon}
    />
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.surface}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <List.Subheader>Users</List.Subheader>
        <FlatList
          data={data?.data || []}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={EmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  statusMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
