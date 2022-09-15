import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { AdCard, AdCardProps } from '../../components/AdCard';

import logoImg from '../../assets/logo-nlw-esports.png';

import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const [ads, setAds] = useState<AdCardProps[]>([]);

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.0.10:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data));
  }, [game.id]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item: ad }) => (
            <AdCard data={ad} onConnect={() => {}} />
          )}
          horizontal
          style={styles.list}
          contentContainerStyle={ads.length ? styles.listContainer : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda!
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}