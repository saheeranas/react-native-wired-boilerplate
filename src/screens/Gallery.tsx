import * as React from 'react';
import {StyleSheet, FlatList, Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, Appbar} from 'react-native-paper';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import EmptyComponent from '../components/EmptyComponent';

const fetchImages = () => {
  return axios.get('https://picsum.photos/v2/list?limit=10');
};

const GalleryEmptyComponent = () => <EmptyComponent title="No images loaded" />;

//  Screen component: Default export
const Gallery = () => {
  const {colors} = useTheme();
  const {data} = useQuery({queryKey: ['galleryImages'], queryFn: fetchImages});

  const renderItem = ({item}: {item: any}) => {
    let url = item.download_url.split('/').slice(0, -2).join('/');

    return (
      <View style={styles.imageWrapper}>
        <Image source={{uri: `${url}/200/200`}} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.surface}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#000" />
      <Appbar.Header>
        <Appbar.Content title="Gallery" />
      </Appbar.Header>
      <FlatList
        data={data?.data || []}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={GalleryEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 5,
  },
  imageWrapper: {
    flex: 1,
    padding: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  statusMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
