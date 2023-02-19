/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {
  Section,
  Container,
  PasswordInputX,
  InputX,
  ButtonX,
} from '../../Components';
import useAppTheme from '../../Themes/Context';
import Fonts from '../../Themes/Fonts';
import useTranslation from '../../i18n';
import theme from '../../Themes/configs/default';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconX, ICON_TYPE } from '../../Icons';

const MainScreen = (props) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const [loading, setLoading] = useState(false);

  const changePassword = () => {

  }

  const editProfile = () => { }
  return (
    <Container style={styles.container}>
      <LoadingActionContainer>
        <Section style={{ borderRadius: 10 }}>
          <View style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, flexDirection: 'row', backgroundColor: '#FFAF00', alignItems: 'center', padding: 20 }}>
            <IconX color={theme.colors.primary} origin={ICON_TYPE.FONT_AWESOME} name={"user-circle-o"} style={{ fontSize: 80 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20 }}>Ramresh Meena</Text>
          </View>
          <View style={{ backgroundColor: '#fff', padding: 20, flexDirection: 'column', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconX color="#00B894" origin={ICON_TYPE.FONT_AWESOME5} name="user-alt" style={{ fontSize: 20 }} />
                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Username</Text>
              </View>
              <Text>9636021465</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconX color="#00B894" origin={ICON_TYPE.FONT_AWESOME5} name="user-alt" style={{ fontSize: 20 }} />
                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Username</Text>
              </View>
              <Text>Ramresh Meena</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconX color="#00B894" origin={ICON_TYPE.FONT_AWESOME5} name="phone" style={{ fontSize: 20 }} />
                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Mobile NO.</Text>
              </View>
              <Text>9636021465</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconX color="#00B894" origin={ICON_TYPE.MATERIAL_ICONS} name="email" style={{ fontSize: 20 }} />
                <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>Mobile NO.</Text>
              </View>
              <Text></Text>
            </View>
          </View>
        </Section>
        <Section>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#33B5E5', paddingVertical: 10, justifyContent: 'center', borderRadius: 6, alignItems: 'center' }}>
            <IconX
              color={theme.colors.primary}
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={"vpn-key"} />
            <Text style={{ color: theme.colors.primary, fontSize: 15, marginLeft: 5, fontWeight: '700' }}>{t('change_password')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#33B5E5', paddingVertical: 10, justifyContent: 'center', borderRadius: 6, alignItems: 'center', marginTop: 5 }}>
            <IconX
              color={theme.colors.primary}
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={"edit"} />
            <Text style={{ color: theme.colors.primary, fontSize: 15, marginLeft: 5, fontWeight: '700' }}>{t('edit_profile')}</Text>
          </TouchableOpacity>
        </Section>
      </LoadingActionContainer>

      {/* <BottomPanel ref={panelRef} /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: theme.colors.mainBackground,
  },
  textInput: {
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default MainScreen;
