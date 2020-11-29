import {useTheme} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Badge from '../components/Badge';
import Slider from '../components/Slider';
import TextInput from '../components/TextInput';
import Touchable from '../components/Touchable';
import {Font} from '../constants/Design';
import {wp} from '../utils';

/*
  move slider card out of Search component as it triggers a lot of re-renders 
  what cause the slider to work not as smooth as it should
*/
const SliderCard = React.memo(
  function (props) {
    const {colors} = useTheme();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [value, setValue] = useState(0);

    function onChange(value) {
      setValue(value);
      if (props.onChange) {
        props.onChange(value);
      }
    }

    return (
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>
          Max cooking time : {value}
          {value == 60 ? '+' : ''} min
        </Text>
        <Slider
          style={{
            height: wp(30),
            justifyContent: 'center',
          }}
          trackHeight={wp(8)}
          thumbSize={wp(25)}
          hitBoxSize={wp(50)}
          min={5}
          max={60}
          precision={5}
          initialValue={20}
          inactiveColor={colors.background}
          activeColor={colors.primary}
          onChange={onChange}
        />
      </View>
    );
  },
  () => true,
);

function Search(props) {
  const {colors} = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);
  const diets = [
    'Vegetarian',
    'Gluten Free',
    'Vegan',
    'Paleo',
    'Ketogenic',
    'Pescetarian',
    'Whole30',
    'Primal',
  ];

  const intolerances = [
    'Dairy',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree Nut',
    'Wheat',
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeDiet, setDiet] = useState(null);
  const [activeIntolerances, setIntolerances] = useState([]);
  const readyTime = useRef(0);

  function onIntolerancePress(item) {
    let updated = null;

    if (activeIntolerances.indexOf(item) > -1) {
      updated = activeIntolerances.filter(
        (intolerance) => intolerance !== item,
      );
    } else {
      updated = activeIntolerances.concat([item]);
    }

    setIntolerances(updated);
  }

  function onDietPress(diet) {
    if (activeDiet === diet) {
      setDiet(null);
    } else {
      setDiet(diet);
    }
  }

  function onSearch() {
    props.navigation.navigate('Recipes', {
      type: 'searchRecipes',
      title: 'Search results',
      config: {
        query: searchQuery,
        maxReadyTime: readyTime.current,
        intolerances: activeIntolerances,
        diet: activeDiet,
      },
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.contentContainerStyle}>
        <TextInput
          placeholder={'Search by title'}
          style={styles.searchInput}
          onChangeText={setSearchQuery}
        />

        <SliderCard onChange={(value) => (readyTime.current = value)} />

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Choose your diet</Text>
          <View style={styles.badgesWrapper}>
            {diets.map((diet) => (
              <Badge
                key={diet}
                label={diet}
                icon={'plus'}
                style={styles.dietBadge}
                isActive={activeDiet === diet}
                onPress={onDietPress}
              />
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Choose intolerances</Text>
          <View style={styles.badgesWrapper}>
            {intolerances.map((item) => (
              <Badge
                key={item}
                label={item}
                icon={'plus'}
                style={styles.dietBadge}
                isActive={activeIntolerances.indexOf(item) > -1}
                onPress={onIntolerancePress}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Touchable onPress={onSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonLabel}>Search recipes</Text>
      </Touchable>
    </SafeAreaView>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    contentContainerStyle: {
      padding: wp(20),
      paddingBottom: wp(70),
      minHeight: '100%',
    },
    searchInput: {
      paddingHorizontal: wp(10),
      fontSize: wp(14),
      lineHeight: wp(18),
      borderRadius: wp(8),
      backgroundColor: colors.card,
      height: wp(50),
    },
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
      marginBottom: wp(8),
    },
    badgesWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: wp(-4),
    },
    dietBadge: {
      margin: wp(4),
    },
    searchButton: {
      backgroundColor: colors.primary,
      height: wp(50),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: wp(0),
      left: wp(0),
      right: wp(0),
    },
    searchButtonLabel: {
      fontSize: wp(16),
      lineHeight: wp(21),
      fontFamily: Font.semiBold,
      color: '#fff',
    },
  });

export default Search;
