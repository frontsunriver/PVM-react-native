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
          <ButtonX
            loading={loading}
            dark={true}
            color={loading ? theme.colors.accent : theme.colors.buttonColor}
            onPress={changePassword}
            label={t('login')}
          />
          <ButtonX
            dark={true}
            color={theme.colors.buttonColor}
            onPress={editProfile}
            label={t('register (free)')}
          />
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
