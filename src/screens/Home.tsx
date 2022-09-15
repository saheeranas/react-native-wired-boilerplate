import * as React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, List, Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import {getUsers} from '../services/api';

const Home = () => {
  const {colors} = useTheme();
  const {data, isLoading} = useQuery('users', getUsers);

  const renderItem = ({item}) => (
    <List.Item
      key={'user' + item.id}
      title={item.name}
      description={item.email}
      left={props => <List.Icon {...props} icon="account-circle" />}
    />
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.surface}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <View>
        <List.Subheader>Users</List.Subheader>
        {data?.data.length ? (
          <FlatList
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.contentContainer}
          />
        ) : (
          <View style={styles.statusMsg}>
            {isLoading ? <Text>Loading</Text> : <Text>No Users found</Text>}
          </View>
        )}
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
