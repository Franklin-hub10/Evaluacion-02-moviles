
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreens from "../screens/WelcomeScreens";
import RegistroScreens from "../screens/RegistroScreens";
import LoginScreens from "../screens/LoginScreens";
import OperacionesScreens from "../screens/OperacionesScreens";
import PerflScreens from "../screens/PerflScreens";
import HistorialScreens from "../screens/HistorialScreens";



const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator>

                <Tab.Screen name="Operaciones" component={OperacionesScreens} />
              
                <Tab.Screen name="Historial" component={HistorialScreens} />
                <Tab.Screen name="Perfil" component={PerflScreens} />
            </Tab.Navigator>

    

    );
}

//////////

const Stack = createStackNavigator();
function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Welcome" >
            <Stack.Screen name='Welcome' component={WelcomeScreens} />
            <Stack.Screen name='Registro' component={RegistroScreens} />
            <Stack.Screen name='Login' component={LoginScreens} />
            <Stack.Screen name='Sesion' component={MyTabs} />
        </Stack.Navigator>
    );
}

//////

export default function MainNavigador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}