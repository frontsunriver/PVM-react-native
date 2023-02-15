import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Section, TouchableX } from '../../Components';
import { Image, View } from 'react-native';
import { Text } from 'react-native';
import metrics from '../../Themes/Metrics';
import useAuth from '../../Services/Auth';
import useAppTheme from '../../Themes/Context';
import {IconX, ICON_TYPE} from '../../Icons';

const Drawer = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Content />
    </DrawerContentScrollView>
  );
};

const Content = () => {
  const { logout } = useAuth();
  const { theme } = useAppTheme();
  return (
    <Section
      style={{
        minHeight: metrics.screenHeight,
        backgroundColor: theme.colors.background,
      }}>
      <Section style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        height: 50
      }}>
        <Image
          source={require("../../Assets/image/default_profile.png")}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={{ marginTop: 5, color: '#fff', fontWeight: '900' }}>RamreshMeena</Text>
      </Section>

      <Item name="My Profile" iconType={ICON_TYPE.FONT_AWESOME} iconName="user"/>
      <Item name="My PlayGame" iconType={ICON_TYPE.FONT_AWESOME} iconName="handshake-o"/>
      <Item name="Commision" iconType={ICON_TYPE.FONT_AWESOME} iconName="pinterest"/>
      <Item name="How to Play?" iconType={ICON_TYPE.FONT_AWESOME} iconName="shower"/>
      <Item name="Result History" iconType={ICON_TYPE.FONT_AWESOME} iconName="history"/>
      <Item name="Add/Withdraw List" iconType={ICON_TYPE.FONT_AWESOME} iconName="bank"/>
      <Item name="Help" iconType={ICON_TYPE.ICONICONS} iconName="ios-call-outline"/>
      <Item name="Share & Earn" iconType={ICON_TYPE.FONT_AWESOME} iconName="share-square-o"/>
      <Item name="Terms & Condition" iconType={ICON_TYPE.ENTYPO} iconName="documents"/>
      <Item name="Sign Out" iconType={ICON_TYPE.ANT_ICON} onPress={logout} iconName="poweroff"/>
    </Section>
  );
};

const Item = ({ name, color = 'white', onPress = () => { }, iconType, iconName }) => {
  return (
    <TouchableX border onPress={onPress}>
      <View style={{ padding: 14, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
        <View style={{width: 50}}>
          <IconX color={color} origin={iconType} name={iconName}  />
        </View>
        <Text style={{ color, fontWeight: "700"}}>{name}</Text>
      </View>
    </TouchableX>
  );
};

export default Drawer;
