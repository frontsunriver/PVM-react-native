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

  const editProfile = () => {}
  return (
    <Container style={styles.container}>
      <LoadingActionContainer>
        <Section>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: theme.colors.primaryText,
              marginTop: 60,
              fontFamily: Fonts.type.stylish,
              marginBottom: 20,
            }}>
            {t('welcome')}
          </Text>
        </Section>
        <Section>
          <TouchableOpacity style={{flexDirection: 'row', backgroundColor: theme.colors.buttonColor, paddingVertical: 15, justifyContent: 'center', borderRadius: 6, alignItems: 'center'}}>
            <IconX 
              color={theme.colors.primary}
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={"vpn-key"} />
            <Text style={{color: theme.colors.primary, fontSize: 15, marginLeft: 5, fontWeight: '700'}}>{t('change_password')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', backgroundColor: theme.colors.buttonColor, paddingVertical: 15, justifyContent: 'center', borderRadius: 6, alignItems: 'center', marginTop: 5}}>
            <IconX 
              color={theme.colors.primary}
              origin={ICON_TYPE.MATERIAL_ICONS}
              name={"edit"} />
            <Text style={{color: theme.colors.primary, fontSize: 15, marginLeft: 5, fontWeight: '700'}}>{t('edit_profile')}</Text>
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
