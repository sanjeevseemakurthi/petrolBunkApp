import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from '../components/homepage';
import Logout from '../components/logout';
const Drawer = createDrawerNavigator();

export default function Routing() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Homepage" component={Homepage} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    </>
  );
}