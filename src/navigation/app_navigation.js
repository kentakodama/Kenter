import { StackNavigator} from 'react-navigation';

import Login from '../authentication/login';
import Splash from '../authentication/splash';
import CompleteProfile from '../components/complete_profile';
import PhotoGallery from '../components/deck/gallery';
import ProfileDetails from '../components/deck/profile_details';
import Main from '../components/main'
import EditAbout from '../components/profile/edit_about'
import AboutMe from '../components/profile/about_me'
import SelectImage from '../components/profile/select_image'
import Thread from '../components/chats/thread'

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
    },
    Thread: {
      screen: Thread
    },
    ProfileDetails: {
      screen: ProfileDetails
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    }
  }
);

export default AppNavigator;
