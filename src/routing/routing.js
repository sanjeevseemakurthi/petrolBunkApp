import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from '../components/homepage';
import Logout from '../components/logout';
import Daysheet from '../components/daysheet';
import Sucesspage from '../components/sucesspage';
const Drawer = createDrawerNavigator();

export default function Routing() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Homepage} />
        <Drawer.Screen name='Daysheet' component={Daysheet} />
        <Drawer.Screen name='Sucesspage' component={Sucesspage}  options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Logout" component={Logout}  options={{ drawerItemStyle: { display: 'none' } }}/>
      </Drawer.Navigator>
    </>
  );
}