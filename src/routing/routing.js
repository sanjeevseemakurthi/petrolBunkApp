import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from '../components/homepage';
import Logout from '../components/logout';
import Daysheet from '../components/daysheet';
const Drawer = createDrawerNavigator();

export default function Routing() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Homepage" component={Homepage} />
        <Drawer.Screen name="Logout" component={Logout} />
        <Drawer.Screen name='Daysheet' component={Daysheet} />
      </Drawer.Navigator>
    </>
  );
}