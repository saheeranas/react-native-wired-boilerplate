import * as React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, List, Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import {getUsers} from '../services/api';

const Home = () => {
  const {colors} = useTheme();
  const {data} = useQuery('users', getUsers);

  const renderItem = ({item}) => (
    <List.Item
      key={'user' + item.id}
      title={item.name}
      description={item.email}
      left={props => <List.Icon {...props} icon="account-circle" />}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.accent}
      />
      <View>
        <List.Subheader>Users</List.Subheader>
        {data?.data.length ? (
          <FlatList
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View>
            <Text>No Users found</Text>
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
});
