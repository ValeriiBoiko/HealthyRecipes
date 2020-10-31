// {
//   "id": 716429,
//   "calories": 584,
//   "carbs": "84g",
//   "fat": "20g",
//   "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
//   "protein": "19g",
//   "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs"
// }
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Colors, Font } from '../../constants/Design';
import { commonStyles } from '../../style';

function Recipe({ id, calories, image, title, ...props }) {
  return (
    <View style={props.style}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{
          backgroundColor: Colors.card,
          flex: 1,
          padding: 8,
          borderRadius: 8,
          paddingBottom: 16
        }}>
          <Image source={{ uri: image }} style={{
            width: '100%',
            aspectRatio: 1,
            marginBottom: 10,
            // borderTopRightRadius: 8,
            // borderTopLeftRadius: 8,
          }} />

          <Text numberOfLines={2} style={commonStyles.regularText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

Recipe.defaultProps = {
  onPress: () => null
}

export default Recipe;