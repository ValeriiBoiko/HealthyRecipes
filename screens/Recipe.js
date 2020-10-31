import { useTheme } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from '../components/Icon';
import IngredientList from '../components/IngredientList';
import List from '../components/List';
import { Font } from '../constants/Design';
import { setRecipe } from '../middleware';
import { wp } from '../utils';

const test = {
  id: '716429',
  title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
  image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
  servings: '2',
  readyInMinutes: '45',
  sourceName: 'Full Belly Sisters',
  ingredients: [
    { title: "1 tbsp butter", "id": 1 },
    { title: "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces", "id": 2 },
    { title: "2 tbsp grated cheese (I used romano)", "id": 3 },
    { title: "1-2 tbsp extra virgin olive oil", "id": 4 },
    { title: "5-6 cloves garlic", "id": 5 },
    { title: "6-8 ounces pasta (I used linguine)", "id": 6 },
  ],
  summary: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with <b>636 calories</b>, <b>21g of protein</b>, and <b>20g of fat</b> each. For <b>$1.83 per serving</b>, this recipe <b>covers 24%</b> of your daily requirements of vitamins and minerals. From preparation to the plate, this recipe takes about <b>45 minutes</b>. This recipe is liked by 209 foodies and cooks. If you have pasta, salt and pepper, cheese, and a few other ingredients on hand, you can make it. To use up the extra virgin olive oil you could follow this main course with the <a href=\"https://spoonacular.com/recipes/peach-crisp-healthy-crisp-for-breakfast-487698\">Peach Crisp: Healthy Crisp for Breakfast</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 86%</b>. This score is tremendous. Try <a href=\"https://spoonacular.com/recipes/cauliflower-gratin-with-garlic-breadcrumbs-318375\">Cauliflower Gratin with Garlic Breadcrumbs</a>, <a href=\"https://spoonacular.com/recipes/pasta-with-cauliflower-sausage-breadcrumbs-30437\">Pasta With Cauliflower, Sausage, & Breadcrumbs</a>, and <a href=\"https://spoonacular.com/recipes/pasta-with-roasted-cauliflower-parsley-and-breadcrumbs-30738\">Pasta With Roasted Cauliflower, Parsley, And Breadcrumbs</a> for similar recipes.',
  aggregateLikes: '209',
  instructions: ["Spray a small skillet with non-stick cooking spray.", "Add the shallot and spinach and cook over medium heat until spinach is wilted.", "Place in a small bowl and set aside.Spray the pan again.", "Pour beaten egg whites or egg into the pan and season with salt and black pepper, to taste. Cook over medium heat until soft-scrambled, about 2 minutes.Mash the avocado with a fork and spread evenly on piece of toast. Top the avocado toast with spinach, scrambled eggs, and tomato slices. Season with salt and pepper, to taste.", "Serve immediately.Note-to make this gluten-free, use gluten-free bread."], "readyInMinutes": 10, "servings": 1, "sourceName": "Two Peas and Their Pod", "state": "READY", "summary": "Watching your figure? This dairy free and vegetarian recipe has <b>274 calories</b>, <b>13g of protein</b>, and <b>16g of fat</b> per serving. For <b>$1.57 per serving</b>, this recipe <b>covers 24%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 142068 foodies and cooks. From preparation to the plate, this recipe takes roughly <b>10 minutes</b>. Head to the store and pick up salt and pepper, private selection campari tomatoes, shallot, and a few other things to make it today. All things considered, we decided this recipe <b>deserves a spoonacular score of 100%</b>. This score is spectacular. Similar recipes include <a href=\"https://spoonacular.com/recipes/avocado-toast-with-smoky-black-beans-spinach-and-eggs-878763\">Avocado Toast with Smoky Black Beans, Spinach, and Eggs</a>, <a href=\"https://spoonacular.com/recipes/baked-eggs-in-avocado-with-bacon-on-toast-589781\">Baked Eggs in Avocado with Bacon on Toast</a>, and <a href=\"https://spoonacular.com/recipes/avocado-on-toast-with-chorizo-fried-eggs-218275\">Avocado on toast with chorizo & fried eggs</a>."
}


function Recipe(props) {
  // const { id, title, image, servings, readyInMinutes, sourceName, summary, ingredients, aggregateLikes, instructions } = props.recipe;
  const { id, title, image, servings, readyInMinutes, sourceName, summary, ingredients, aggregateLikes, instructions } = test;
  const { colors } = useTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const infoItems = [
    { title: "Serves", value: servings + ' serv' },
    { title: "Time", value: readyInMinutes + " min" },
    { title: "Likes", value: aggregateLikes }
  ];

  useEffect(() => {
    // props.setRecipe(props.route.params.recipeId);
  }, []);

  if (props.recipe.state && props.recipe.state !== 'READY') {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={styles.recipeTitle}>Loading ...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={[styles.card, { marginTop: wp(-40) }]}>
          <View style={styles.authorBar}>
            <Icon
              name={'user'}
              size={wp(20)}
              color={colors.secondary}
              style={styles.authorIcon} />
            <Text numberOfLines={1} style={styles.authorName}>
              Recipe By: {sourceName}
            </Text>
          </View>

          <Text style={styles.recipeTitle}>{title}</Text>

          <View style={styles.recipeInfo}>
            {
              infoItems.map(item => (
                <View key={item.title}>
                  <Text style={styles.infoItemTitle}>{item.title}</Text>
                  <Text style={styles.infoItemValue}>{item.value}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>

      <View style={[styles.sectionCard, styles.card]}>
        <Text style={styles.sectionTitle}>Ingredients required for recipe</Text>
        <Text style={styles.sectionSubTitle}>Total ingredient count : {ingredients.length}</Text>

        <IngredientList ingredients={ingredients} />
      </View>

      <View style={[styles.sectionCard, styles.card]}>
        <Text style={styles.sectionTitle}>Description of Preparation</Text>
        <Text style={styles.sectionSubTitle}>No of steps is  : {instructions.length}</Text>

        <List
          items={instructions}
          type={'numeric'}
          itemStyle={{ marginBottom: 0 }}
          delimiter={true}
        />
      </View>
    </ScrollView>
  )
}

const getStyles = (colors) => StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 636 / 393,
  },
  card: {
    marginHorizontal: wp(20),
    borderRadius: 8,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  authorBar: {
    backgroundColor: colors.card,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: wp(20),
    height: wp(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  authorIcon: {
    opacity: .5,
    marginRight: 8,
  },
  authorName: {
    color: colors.secondary,
    fontSize: wp(13),
  },
  recipeTitle: {
    fontFamily: Font.bold,
    fontSize: wp(21),
    lineHeight: wp(28),
    paddingHorizontal: wp(20),
    paddingVertical: 8
  },
  recipeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  infoItemTitle: {
    marginTop: 8,
    fontSize: wp(16),
    lineHeight: wp(20),
    fontFamily: Font.bold,
    color: colors.secondary,
    textAlign: 'center',
  },
  infoItemValue: {
    paddingTop: 12,
    paddingBottom: 14,
    fontSize: wp(16),
    lineHeight: wp(20),
    textAlign: 'center',
    color: colors.accent,
    fontFamily: Font.bold,
  },
  sectionCard: {
    marginTop: wp(20),
    paddingVertical: wp(20),
    paddingHorizontal: wp(20)
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: wp(20),
    lineHeight: wp(24),
    color: colors.text,
    fontFamily: Font.bold,
  },
  sectionSubTitle: {
    marginBottom: 12,
    fontSize: wp(16),
    lineHeight: wp(20),
    color: colors.accent,
    fontFamily: Font.bold,
  }
});

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipe: (id) => dispatch(setRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);