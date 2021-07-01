import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular } from '../../components/ui/Text'
import favorite from '../../store/favorite'
import { THEME } from '../../theme'
import screenManager from '../../store/screenManager'
import { favoriteDB } from '../../favoriteDB'
import { observer } from 'mobx-react-lite'

export const FavoriteScreen = observer(() => {
  const data = []
  favorite.data.forEach((el, idx) => {
    if (idx % 2 === 0) data.push([])
    data[data.length - 1].push(el)
  })

  const showAlert = (title, idx) => {
    Alert.alert('Удалить группу?', `Удалить группу ${title} из избранного?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await favoriteDB.del(idx)
          const favorites = await favoriteDB.getFavorite()
          favorite.setData(favorites)
        },
      },
    ])
  }

  return (
    <ScrollView>
      <Header title='Избранное' prevLink='Main' />
      <TextRegular style={styles.title}>Группы</TextRegular>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={el => el}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                {item.map(el => {
                  const { groupTitle, institutTitle, TLTitle } = JSON.parse(
                    el.data
                  )
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.col}
                      onPress={() => {
                        screenManager.navigate('AbitsTimetable', {
                          institutTitle,
                          groupTitle,
                          item: TLTitle,
                        })
                      }}
                      onLongPress={() => showAlert(groupTitle, el.id)}
                    >
                      <TextRegular style={styles.text}>
                        {groupTitle}
                      </TextRegular>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )
          }}
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/image/not_found.png')}
            style={{
              width: 250,
              height: 250,
              marginTop: 32,
            }}
          />
          <TextRegular style={{ marginTop: 24, fontSize: 20 }}>
            В избранном ничего нет
          </TextRegular>
        </View>
      )}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
  },

  row: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  col: {
    padding: 8,
    width: 156,
    height: 40,
    justifyContent: 'center',
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
  },

  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
})
