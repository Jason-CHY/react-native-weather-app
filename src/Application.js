import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Container, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';

const Application = ({ backgroundColor, children, statusBarHidden, statusBarContent }) => {
  return (
    <StyleProvider style={getTheme()}>
      <Container style={{ backgroundColor: backgroundColor ? backgroundColor : Config.theme.default.backgroundColor }}>
        {children}
      </Container>
    </StyleProvider>
  );
};

Application.defaultProps = {
  backgroundColor: null,
  children: null,
  statusBarHidden: false,
};

export { Application as default };