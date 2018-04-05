import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';
import CompleteProfile from '../components/complete_profile';
import Gallery from '../components/deck/gallery';
import Main from '../components/main'
import EditAbout from '../components/profile/edit_about'
import AboutMe from '../components/profile/about_me'
import SelectImage from '../components/profile/select_image'

const AppNavigator = StackNavigator(

  {
    Index: {
      screen: Splash
    },
    Login: {
      screen: Login
    },
    CompleteProfile: {
      screen: CompleteProfile
    },
    Gallery: {
      screen: Gallery
    },
    Main: {
      screen: Main
    },
    EditAbout: {
      screen: EditAbout
    },
    AboutMe: {
      screen: AboutMe
    },
    SelectImage: {
      screen: SelectImage
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
  }
);

export default AppNavigator;
