// Components
import NavBar from "../components/NavBar";
import SopetButton from "../components/SopetButton";
import VetBox from "../components/VetBox";

// function component
import DateToString from "../components/Function/DateToString";
import TimeToString from "../components/Function/TimeToString";

// Screen Compenents
import LoadingModal from "../components/LoadingModal";
import MainScreenNavBar from "../components/MainScreenNavBar";
import ServiceBox from "../components/ServiceBox";
import ServiceInfo from "../components/ServiceInfo";
import VetDetailScreen from "../screens/vet/VetDetailScreen";
import VetReviewScreen from "../screens/vet/VetReviewScreen";

// Screens
import TestScreen from "../screens/TestScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/MainScreen";
import MainScreen from "../screens/MainScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import EditProfileScreen from "../screens/user/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import SelectVetScreen from "../screens/SelectVetScreen";
import TopUpScreen from "../screens/topup/TopUpScreen";
import TopUpHistoryScreen from "../screens/topup/TopUpHistoryScreen";
import VetProfileScreen from "../screens/vet/VetProfileScreen";
import EditPetScreen from "../screens/pet/EditPetScreen";
import PetScreen from "../screens/pet/PetScreen";
import VetLoginScreen from "../screens/vet/VetLoginScreen";
import VetRegisterScreen from "../screens/vet/VetRegisterScreen";
import EditVetProfileScreen from "../screens/vet/EditVetProfileScreen";
import VetMainScreen from "../screens/vet/VetMainScreen";
import VetHomeScreen from "../screens/vet/VetHomeScreen";
import NewPetScreen from "../screens/pet/NewPetScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import ServiceHistoryScreen from "../screens/chat/ServiceHistoryScreen";
import MatchingLandingScreen from "../screens/matching/MatchingLandingScreen";
import MatchingReviewScreen from "../screens/matching/MatchingReviewScreen";
import MatchingReportScreen from "../screens/matching/MatchingReportScreen";
import CaseSummaryScreen from "../screens/matching/CaseSummaryScreen";
import VetServiceHistory from "../screens/vet/VetServiceHistory";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminRegisterScreen from "../screens/admin/AdminRegisterScreen";
import VetStatusModal from "../components/VetStatusModal";

const Stack = createStackNavigator();

export default StackNavigation = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initialRouteName}>
        {/* Screens */}
        <Stack.Screen
          name="PetScreen"
          component={PetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPetScreen"
          component={EditPetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUsScreen"
          component={AboutUsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopUpScreen"
          component={TopUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectVetScreen"
          component={SelectVetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopUpHistoryScreen"
          component={TopUpHistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetProfileScreen"
          component={VetProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditVetProfileScreen"
          component={EditVetProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetLoginScreen"
          component={VetLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetRegisterScreen"
          component={VetRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetMainScreen"
          component={VetMainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetHomeScreen"
          component={VetHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetServiceHistory"
          component={VetServiceHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPetScreen"
          component={NewPetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceHistoryScreen"
          component={ServiceHistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchingLandingScreen"
          component={MatchingLandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchingReviewScreen"
          component={MatchingReviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchingReportScreen"
          component={MatchingReportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CaseSummaryScreen"
          component={CaseSummaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminRegisterScreen"
          component={AdminRegisterScreen}
          options={{ headerShown: false }}
        />

        {/* Screen Compoent */}
        <Stack.Screen
          name="VetDetailScreen"
          component={VetDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetReviewScreen"
          component={VetReviewScreen}
          options={{ headerShown: false }}
        />

        {/* Components */}
        <Stack.Screen
          name="NavBar"
          component={NavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreenNavBar"
          component={MainScreenNavBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SopetButton"
          component={SopetButton}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetBox"
          component={VetBox}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceBox"
          component={ServiceBox}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoadingModal"
          component={LoadingModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetStatusModal"
          component={VetStatusModal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ServiceInfo"
          component={ServiceInfo}
          options={{ headerShown: false }}
        />

        {/* Function */}
        <Stack.Screen
          name="DateToString"
          component={DateToString}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimeToString"
          component={TimeToString}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
