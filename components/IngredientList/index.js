import { useTheme } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Font } from '../../constants/Design';
import Icon from '../Icon';

function IngredientList(props) {
  const { colors } = useTheme();
  const [selectedItems, setSelectedItems] = useState({});

  function onPressIngredient(id, title) {
    if (selectedItems[id]) {
      const updated = { ...selectedItems };
      delete updated[id];
      setSelectedItems(updated);
    } else {
      const ingredient = { id, title };
      setSelectedItems({ ...selectedItems, [id]: ingredient });
    }
  }

  const ingredients = props.ingredients.map((item, index) => {
    icon = selectedItems[item.id] ? (
      <View style={[styles.button, {
        backgroundColor: 'transparent',
        borderColor: colors.error
      }]}>
        <Icon name={'minus'} size={25} color={colors.error} />
      </View>
    ) : (
        <View style={[styles.button, {
          backgroundColor: colors.primary,
          borderColor: colors.primary
        }]}>
          <Icon name={'plus'} size={25} color={'#f2f1f6'} />
        </View>
      );

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => onPressIngredient(item.id, item.title)}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {icon}
          <Text style={{
            color: colors.secondary,
            color: colors.text,
            fontFamily: Font.bold,
            fontFamily: Font.regular,
            fontSize: 16,
            flex: 1,
          }}>{item.title}</Text>

        </View>
      </TouchableWithoutFeedback>
    )
  })

  return (
    <View>
      {ingredients}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 35,
    height: 35,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginVertical: 8,
    marginRight: 16
  }
})

export default IngredientList