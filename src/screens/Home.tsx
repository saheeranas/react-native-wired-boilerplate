import * as React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme,
  Appbar,
  List,
  ListIconProps,
  ActivityIndicator,
  Surface,
  Text,
  Button,
} from 'react-native-paper';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import EmptyComponent from '../components/EmptyComponent';

import {getUsers} from '../services/api';

const ListIcon = (props: Pick<ListIconProps, 'color' | 'style'>) => (
  <List.Icon {...props} icon="account-circle" />
);

//  Screen component: Default export
const Home = () => {
  const {colors} = useTheme();
  const {data, isLoading} = useQuery({queryKey: ['users'], queryFn: getUsers});

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
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data || []}
          renderItem={renderItem}
          keyExtractor={item => `user-${item.name}-${item.id}`}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={() => (
            <Text variant="titleMedium">Top Users</Text>
          )}
          ListHeaderComponentStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
          ListEmptyComponent={EmptyComponent}
        />
      )}
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
  welcomCard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
    height: 140,
    justifyContent: 'center',
  },
});
