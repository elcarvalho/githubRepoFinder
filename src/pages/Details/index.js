import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

const Details = ({route}) => {
  const [repository, setRepository] = useState();

  useEffect(() => {
    const repo = route.params.repository;
    setRepository(repo);
  }, []);

  return (
    <WebView
      source={{uri: route.params.repository.html_url}}
      style={{flex: 1, flexWrap: 'wrap'}}
    />
  );
};

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.shape({
        html_url: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default Details;
