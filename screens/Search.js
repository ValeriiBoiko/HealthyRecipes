import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Badge from '../components/Badge';
import Slider from '../components/Slider';
import TextInput from '../components/TextInput';
import Touchable from '../components/Touchable';
import { Font } from '../constants/Design';
import { wp } from '../utils';

function Search(props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const diets = [
    'All Recipes',
    'Vegetarian',
    'Gluten Free',
    'Vagan',
    'Paleo',
    'Ketogenic',
    'Pescetarian',
    'Whole30',
    'Primal'
  ];

  const intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat"
  ];

  const [activeDiet, setDiet] = useState('All Recipes');
  const [activeIntolerances, setIntolerances] = useState([]);
  const [time, setTime] = useState(0);

  function onIntoleracePress(item) {
    let updated = null;

    if (activeIntolerances.indexOf(item) > -1) {
      updated = activeIntolerances.filter(intolerance => intolerance !== item);
    } else {
      updated = activeIntolerances.concat([item]);
    }

    setIntolerances(updated);
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
    }}>
      <ScrollView style={{ flex: 1, }}
        contentContainerStyle={{
          padding: wp(20),
          minHeight: '100%',
          paddingBottom: wp(65)
        }}>
        <TextInput
          placeholder={'Search by title'}
          style={{
            paddingHorizontal: wp(10),
            fontSize: wp(14),
            lineHeight: wp(18),
            borderRadius: wp(8),
            backgroundColor: colors.card,
            height: wp(50),
          }}
        />

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Max cooking time : {time}{time == 60 ? '+' : ''} min</Text>
          <Slider
            style={{
              height: 30,
              justifyContent: 'center'
            }}
            trackHeight={8}
            trackWidth={-1}
            thumbSize={25}
            hitBoxSize={50}
            max={60}
            min={5}
            precision={5}
            initialValue={30}
            inactiveColor={colors.background}
            activeColor={colors.primary}
            onChange={setTime}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Choose your diet</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: wp(-4),
          }}>
            {
              diets.map(diet => (
                <Badge
                  onPress={setDiet}
                  key={diet}
                  isActive={activeDiet === diet}
                  style={styles.dietBadge}
                  icon={'plus'}
                  onChange={(val) => console.log(val)}
                  label={diet} />
              ))
            }
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Choose intolerances</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: wp(-4),
          }}>
            {
              intolerances.map(item => (
                <Badge
                  onPress={onIntoleracePress}
                  key={item}
                  isActive={activeIntolerances.indexOf(item) > -1}
                  style={styles.dietBadge}
                  icon={'plus'}
                  onChange={(val) => console.log(val)}
                  label={item} />
              ))
            }
          </View>
        </View>

      </ScrollView>
      <Touchable style={{
        backgroundColor: colors.primary,
        height: wp(50),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: wp(0),
        left: wp(0),
        right: wp(0),
      }}>
        <Text style={{
          fontSize: wp(16),
          lineHeight: wp(21),
          fontFamily: Font.semiBold,
          color: '#fff',
        }}>Search recipes</Text>
      </Touchable>
    </SafeAreaView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  card: {
    marginTop: wp(15),
    backgroundColor: colors.card,
    borderRadius: wp(8),
    paddingHorizontal: wp(10),
    paddingVertical: wp(15),
  },
  sectionLabel: {
    fontSize: wp(16),
    lineHeight: wp(20),
    fontFamily: Font.semiBold,
    color: colors.text,
    marginBottom: wp(8)
  },
  dietBadge: {
    margin: wp(4),
  },
})

export default Search;