import * as React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme,
  Appbar,
  List,
  ListIconProps,
  ActivityIndicator,
  Text,
  Chip,
  MD3Colors,
  Avatar
} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import EmptyComponent from '../components/EmptyComponent';

// Services
import {getUsers} from '../services/api';

const LoadingSkeletonComponent = () => (
  <ContentLoader>
    <Circle x="32" y="12" r="12" fill="#eee" />
    <Rect x="70" y="0" width="80" height="12" />
    <Rect x="70" y="16" width="160" height="12" />
    <Circle x="32" y="59" r="12" fill="#eee" />
    <Rect x="70" y="47" width="80" height="12" />
    <Rect x="70" y="63" width="160" height="12" />
  </ContentLoader>
);

const ListIcon = (props: Pick<ListIconProps, 'color' | 'style'>) => (
  <View style={{ justifyContent: "center", alignItems: "center", paddingLeft: 12 }}>
    <Avatar.Text size={36} label="XD" />
  </View>
);

const RightSection = () => (
  <List.Icon color={MD3Colors.tertiary70} icon="chevron-right" />
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
      right={RightSection}
      style={styles.listItem}
      titleStyle={styles.listItemTitle}
    />
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, {backgroundColor: colors.surface}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />



      {isLoading ? (
        <LoadingSkeletonComponent />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `user-${item.name}-${item.id}`}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={EmptyComponent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
    paddingTop: 15,
    paddingBottom: 50,
    paddingHorizontal: 12
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
  listItem: { borderWidth: 1, borderColor: "#ccc", borderRadius: 16, backgroundColor: "#fff" },
  listItemTitle: { marginBottom: 10, fontSize: 18 }
});
