import { StackNavigator} from 'react-navigation';

export default const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Splash
    },
    StripeLogoPage: {
      screen: StripeLogoPage
    },
    NewCardPage: {
      screen: NewCardPage
    },
    SimpleApp: {
      screen: SimpleApp
    },
    Signup: {
      screen: Signup
    },
    Cart: {
      screen: Cart
    },
    CheckOut: {
      screen: CheckOut
    },
    Confirmation: {
      screen: Confirmation
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);
